import { To, KeyCode, Manipulator, KarabinerRules } from "./types";

/**
 * Custom way to describe a command in a layer
 */
export interface LayerCommand {
  to?: To[];
  description?: string;
  [key: string]: LayerCommand | To[] | string | undefined;
}

type HyperKeySublayer = {
  // The ? is necessary, otherwise we'd have to define something for _every_ key code
  [key_code in KeyCode]?: LayerCommand | HyperKeySublayer;
};

/**
 * Create a Hyper Key sublayer, where every command is prefixed with a key
 * e.g. Hyper + O ("Open") is the "open applications" sublayer, I can press
 * e.g. Hyper + O + G ("Google Chrome") to open Chrome
 */
export function createHyperSubLayer(
  sublayer_key: KeyCode,
  commands: HyperKeySublayer,
  allSubLayerVariables: string[]
): Manipulator[] {
  const subLayerVariableName = generateSubLayerVariableName(sublayer_key);

  const processSubLayer = (
    commands: HyperKeySublayer,
    parentVariable: string
  ): Manipulator[] => {
    return Object.entries(commands).flatMap(([key, value]) => {
      if (!value) return [];
      
      const isSubLayer = typeof value === "object" && !("to" in value);
      if (isSubLayer) {
        const subLayerVariable = `${parentVariable}_${key}`;
        return [
          {
            description: `Toggle sub-sublayer ${key}`,
            type: "basic",
            from: {
              key_code: key as KeyCode,
              modifiers: {
                optional: ["any"],
              },
            },
            to: [
              {
                set_variable: {
                  name: subLayerVariable,
                  value: 1,
                },
              },
            ],
            to_after_key_up: [
              {
                set_variable: {
                  name: subLayerVariable,
                  value: 0,
                },
              },
            ],
            conditions: [
              {
                type: "variable_if",
                name: parentVariable,
                value: 1,
              },
            ],
          },
          ...processSubLayer(value as HyperKeySublayer, subLayerVariable),
        ];
      }

      return [{
        type: "basic",
        from: {
          key_code: key as KeyCode,
          modifiers: {
            optional: ["any"],
          },
        },
        to: (value as LayerCommand).to || [],
        conditions: [
          {
            type: "variable_if",
            name: parentVariable,
            value: 1,
          },
        ],
      }];
    });
  };

  return [
    {
      description: `Toggle Hyper sublayer ${sublayer_key}`,
      type: "basic",
      from: {
        key_code: sublayer_key,
        modifiers: {
          optional: ["any"],
        },
      },
      to: [
        {
          set_variable: {
            name: subLayerVariableName,
            value: 1,
          },
        },
      ],
      to_after_key_up: [
        {
          set_variable: {
            name: subLayerVariableName,
            value: 0,
          },
        },
      ],
      conditions: [
        ...allSubLayerVariables
          .filter(
            (subLayerVariable) => subLayerVariable !== subLayerVariableName
          )
          .map((subLayerVariable) => ({
            type: "variable_if" as const,
            name: subLayerVariable,
            value: 0,
          })),
        {
          type: "variable_if",
          name: "hyper",
          value: 1,
        },
      ],
    },
    ...processSubLayer(commands, subLayerVariableName),
  ];
}

/**
 * Create all hyper sublayers. This needs to be a single function, as well need to
 * have all the hyper variable names in order to filter them and make sure only one
 * activates at a time
 */
export function createHyperSubLayers(subLayers: {
  [key_code in KeyCode]?: LayerCommand | HyperKeySublayer;
}): KarabinerRules[] {
  const allSubLayerVariables = (
    Object.keys(subLayers) as (keyof typeof subLayers)[]
  ).map((sublayer_key) => generateSubLayerVariableName(sublayer_key));

  return Object.entries(subLayers).map(([key, value]) => {
    if (!value) return { description: "", manipulators: [] };

    const isDirectCommand = "to" in value;
    if (isDirectCommand) {
      return {
        description: `Hyper Key + ${key}`,
        manipulators: [
          {
            ...value as LayerCommand,
            type: "basic" as const,
            from: {
              key_code: key as KeyCode,
              modifiers: {
                optional: ["any"],
              },
            },
            conditions: [
              {
                type: "variable_if",
                name: "hyper",
                value: 1,
              },
              ...allSubLayerVariables.map((subLayerVariable) => ({
                type: "variable_if" as const,
                name: subLayerVariable,
                value: 0,
              })),
            ],
          },
        ],
      };
    }

    return {
      description: `Hyper Key sublayer "${key}"`,
      manipulators: createHyperSubLayer(
        key as KeyCode,
        value as HyperKeySublayer,
        allSubLayerVariables
      ),
    };
  });
}

function generateSubLayerVariableName(key: KeyCode) {
  return `hyper_sublayer_${key}`;
}

/**
 * Shortcut for "open" shell command
 */
export function open(...what: string[]): LayerCommand {
  return {
    to: what.map((w) => ({
      shell_command: `open ${w}`,
    })),
    description: `Open ${what.join(" & ")}`,
  };
}

/**
 * Utility function to create a LayerCommand from a tagged template literal
 * where each line is a shell command to be executed.
 */
export function shell(
  strings: TemplateStringsArray,
  ...values: any[]
): LayerCommand {
  const commands = strings.reduce((acc, str, i) => {
    const value = i < values.length ? values[i] : "";
    const lines = (str + value)
      .split("\n")
      .filter((line) => line.trim() !== "");
    acc.push(...lines);
    return acc;
  }, [] as string[]);

  return {
    to: commands.map((command) => ({
      shell_command: command.trim(),
    })),
    description: commands.join(" && "),
  };
}

/**
 * Shortcut for managing window sizing with Rectangle
 */
export function rectangle(name: string): LayerCommand {
  return {
    to: [
      {
        shell_command: `open -g rectangle-pro://execute-action?name=${name}`,
      },
    ],
    description: `Window: ${name}`,
  };
}

/**
 * Shortcut for "Open an app" command (of which there are a bunch)
 */
export function app(name: string): LayerCommand {
  return open(`-a '${name}.app'`);
}
