import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Fix the problem with < and >
  {
    description: "Swap < and > correctly with Shift",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "non_us_backslash",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "grave_accent_and_tilde",
          },
        ],
      },
      {
        type: "basic",
        from: {
          key_code: "non_us_backslash",
          modifiers: {
            mandatory: ["shift"],
          },
        },
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["shift"],
          },
        ],
      },
      {
        type: "basic",
        from: {
          key_code: "grave_accent_and_tilde",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "non_us_backslash",
          },
        ],
      },
      {
        type: "basic",
        from: {
          key_code: "grave_accent_and_tilde",
          modifiers: {
            mandatory: ["shift"],
          },
        },
        to: [
          {
            key_code: "non_us_backslash",
            modifiers: ["shift"],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- //
  //      HYPERKEY
  // ---------------------------------------------------------------- //
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        type: "basic",
      },
    ],
  },

  // ---------------------------------------------------------------- //
  //      CAPS LOCK
  // ---------------------------------------------------------------- //
  {
    description: "Caps Lock",
    manipulators: [
      {
        description: "Hyper + M -> Caps Lock",
        from: {
          key_code: "m",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "caps_lock",
          },
        ],
        type: "basic",
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1,
          },
        ],
      },
    ],
  },

  ...createHyperSubLayers({
    spacebar: open("notion://www.notion.so/jriera/Jabel-s-Keyboard-Shortcuts-1a89bb54bc03807baef5eff5543e4e2d"),

    left_arrow: {
      description: "Switch to the previous Space",
      to: [
        {
          key_code: "left_arrow",
          modifiers: ["left_control"],
        },
      ],
    },

    right_arrow: {
      description: "Switch to the next Space",
      to: [
        {
          key_code: "right_arrow",
          modifiers: ["left_control"],
        },
      ],
    }, 

    // ---------------------------------------------------------------- //
    // B = Brave / Browse
    // ---------------------------------------------------------------- //

    b: {
      spacebar: open("https://pdpaola.com"),
      l: open("https://pdpaola.cloud.looker.com"),
      m: open("https://mail.google.com"),
      x: open("https://x.com"),
    },

    // ---------------------------------------------------------------- //
    // J = Jira
    // ---------------------------------------------------------------- //

    j: {
      spacebar: open("raycast://extensions/thomaslombart/jira/my-filters"),

      // Support Tickets
      s: open(
        "https://pdpaola.atlassian.net/jira/servicedesk/projects/IT/queues/custom/163"
      ),
      // Developement
      d: open(
        "https://pdpaola.atlassian.net/jira/polaris/projects/ITP/ideas/view/3404380"
      ),

      // Ordered from left to right (Q, W, E), the three Jira Software IT projects
      q: /*  BAB  */ open(
        "https://pdpaola.atlassian.net/jira/software/c/projects/BAB/boards/44"
      ),
      w: /*  COM  */ open(
        "https://pdpaola.atlassian.net/jira/software/c/projects/COM/boards/46"
      ),
      e: /*  DAT  */ open(
        "https://pdpaola.atlassian.net/jira/software/c/projects/DAT/boards/45"
      ),

      v: {
        description: "View Ticket",
        to: [
          {
            key_code: "v",
            modifiers: ["left_command", "left_option"],
          },
        ],
      },
    },

    // ---------------------------------------------------------------- //
    // A = Applications
    // ---------------------------------------------------------------- //

    a: {
      description: "Switch Applications",
      spacebar: {
        to: [
          {
            key_code: "tab",
            modifiers: ["left_command", "left_option"],
          },
        ],
      },
      b: app("Brave Browser"),
      c: app("Notion Calendar"),
      d: app("Discord"),
      f: app("Finder"),
      m: app("Music"),
      n: app("Notion"),
      1: app("1Password"),
      s: app("Slack"),
      t: app("Terminal"),
      v: app("Cursor"), // Visual Studio Code
      w: app("Whatsapp"),
      i: {
        to: [
          {
            key_code: "i",
            modifiers: ["left_control", "left_command"],
          },
        ],
      },
    },

    // ---------------------------------------------------------------- //
    // N = Notion
    // ---------------------------------------------------------------- //

    n: {

      // ---------------- //
      // Follow-up Pages  //
      // ---------------- //

      q: /*  BAB  */ open(
        "notion://www.notion.so/jriera/Babylon-5286b76c5f814b5e80018c9c2f1746e5?pvs=25"
      ),
      w: /*  COM  */ open(
        "notion://www.notion.so/jriera/Ecommerce-4d14585900d14482a6663b38e24c1460?pvs=25"
      ),
      e: /*  DAT  */ open(
        "notion://www.notion.so/jriera/Data-9b10c993633f4932a95742f484e96a5d?pvs=25"
      ),
      r: /*  SYS  */ open(
        "notion://www.notion.so/jriera/Sysadmin-4afef3fe2fdb4e58ad32d0bfe6c06195?pvs=25"
      ),

      a: /*  CEO  */ open(
        "notion://www.notion.so/jriera/Humbert-421761737c744a8e95065153c18fed63?pvs=4"
      ),
      s: /* TODOs */ open(
        "notion://www.notion.so/jriera/19e9bb54bc0380d7bf9ee11350cc13d7?v=19e9bb54bc0380c4899d000c6d019498&pvs=4"
      ),
      d: /* Dashboard */ open(
        "notion://www.notion.so/jriera/Control-Center-cc2d07d307174663aeee0192029d4ee5?pvs=4"
      ),

      // ---------------- //
      // Add to Databases //
      // ---------------- //

      i: {
        description: "Manually add to To Do List",
        to: [
          {
            key_code: "i",
            modifiers: ["left_command", "left_option"],
          },
        ],
      },

      o: {
        description: "Manually add to Read Later List",
        to: [
          {
            key_code: "o",
            modifiers: ["left_command", "left_option"],
          },
        ],
      },

      k: {
        description: "Automatically add to To Do List",
        to: [
          {
            key_code: "k",
            modifiers: ["left_command", "left_option"],
          },
        ],
      },

      l: {
        description: "Automatically add to Read Later List",
        to: [
          {
            key_code: "l",
            modifiers: ["left_command", "left_option"],
          },
        ],
      },
    },

    // ---------------------------------------------------------------- //
    // W = Windows Management
    // ---------------------------------------------------------------- //

    w: {
      
      h: {
        description: "Hide Application",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },

      f: {
        description: "Full Screen",
        to: [
          {
            key_code: "f",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      q: {
        description: "Tabs Navigation",
        left_arrow: {
          description: "Switch to the previous Tab",
          to: [
            {
              key_code: "tab",
              modifiers: ["right_control", "right_shift"],
            },
          ],
        },
        right_arrow: {
          description: "Switch to the next Tab",
          to: [
            {
              key_code: "tab",
              modifiers: ["right_control"],
            },
          ],
        },
      },

      spacebar: {
        description: "Next Window from the same Application",
        to: [
          {
            key_code: "down_arrow",
            modifiers: ["left_control"],
          },
        ],
      },

      s: {
        description: "Switch to the next Space",
        right_arrow: {
          to: [
            {
              key_code: "p",
              modifiers: ["left_control", "left_option", "left_command"],
            },
          ],
        },
        left_arrow: {
          description: "Switch to the previous Space",
          to: [
            {
              key_code: "o",
              modifiers: ["left_control", "left_option", "left_command"],
            },
          ],
        },
      },

      d: {
        right_arrow: {
          description: "Switch to the next Display",
          to: [
            {
              key_code: "i",
              modifiers: ["left_control", "left_option", "left_command"],
            },
          ],
        },
        left_arrow: {
          description: "Display: Previous",
          to: [
            {
              key_code: "u",
              modifiers: ["left_control", "left_option", "left_command"],
            },
          ],
        },
      },

      e: {
        right_arrow: {
          description: "Elastic Width (Right)",
          to: [
            {
              key_code: "b",
              modifiers: ["left_control", "left_option", "left_command"],
            },
          ],
        },
        left_arrow: {
          description: "Elastic Width (Left)",
          to: [
            {
              key_code: "v",
              modifiers: ["left_control", "left_option", "left_command"],
            },
          ],
        },
      },

      up_arrow: {
        description: "Top Half Display (1/2, 1/3, 2/3)",
        to: [
          {
            key_code: "m",
            modifiers: ["left_control", "left_option", "left_command"],
          },
        ],
      },

      down_arrow: {
        description: "Bottom Half Display (1/2, 1/3, 2/3)",
        to: [
          {
            key_code: "n",
            modifiers: ["left_control", "left_option", "left_command"],
          },
        ],
      },

      right_arrow: {
        description: "Half Right Display (1/2, 1/3, 2/3)",
        to: [
          {
            key_code: "period",
            modifiers: ["left_control", "left_option", "left_command"],
          },
        ],
      },

      left_arrow: {
        description: "Half Left Display (1/2, 1/3, 2/3)",
        to: [
          {
            key_code: "comma",
            modifiers: ["left_control", "left_option", "left_command"],
          },
        ],
      },

      // Corners
      /*
      up_arrow: {
        left_arrow: { to: [{ key_code: "t", modifiers: ["left_control","left_option","left_command"] }] },
        right_arrow: { to: [{ key_code: "y", modifiers: ["left_control","left_option","left_command"] }] },
      },
      down_arrow: {
        left_arrow: { to: [{ key_code: "g", modifiers: ["left_control","left_option","left_command"] }] },
        right_arrow: { to: [{ key_code: "h", modifiers: ["left_control","left_option","left_command"] }] },
      },
      */
    },

    // ---------------------------------------------------------------- //
    // S = System
    // ---------------------------------------------------------------- //

    s: {
      u: {
        description: "Volume Up",
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },

      j: {
        description: "Volume Down",
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },

      i: {
        description: "Brightness Up",
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },

      k: {
        description: "Brightness Down",
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },

      l: {
        description: "Lock Screen",
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },

      p: {
        description: "Play/Pause",
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },

      semicolon: {
        description: "Fast Forward",
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },

      d: {
        description: "Do Not Disturb Toggle",
        to: [
          {
            key_code: "d",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      t: {
        description: "Toggle Theme",
        to: [
          {
            key_code: "t",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      c: {
        description: "Open Camera",
        to: [
          {
            key_code: "c",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },
    },

    // ---------------------------------------------------------------- //
    // C = Music
    // ---------------------------------------------------------------- //
    c: {
      p: {
        description: "Play/Pause",
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },

      n: {
        description: "Fast Forward",
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },

      b: {
        description: "Rewind",
        to: [
          {
            key_code: "rewind",
          },
        ],
      },
    },

    // ---------------------------------------------------------------- //
    // R = Raycast
    // ---------------------------------------------------------------- //

    r: {
      c: {
        description: "Confetti",
        to: [
          {
            key_code: "m",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      x: {
        description: "Gif Search",
        to: [
          {
            key_code: "n",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      g: {
        description: "Gif Search",
        to: [
          {
            key_code: "g",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      e: {
        description: "Emoji Search",
        to: [
          {
            key_code: "e",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      a: {
        description: "AI Chat",
        to: [
          {
            key_code: "a",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      h: {
        description: "Clipboard History",
        to: [
          {
            key_code: "h",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      f: {
        description: "Open Downloads Folder",
        to: [
          {
            key_code: "d",
            modifiers: ["left_command", "left_option"],
          },
        ],
      },

      1: {
        description: "Connect Favorite Device 1",
        to: [
          {
            key_code: "1",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },

      2: {
        description: "Connect Favorite Device 2",
        to: [
          {
            key_code: "2",
            modifiers: ["left_control", "left_option"],
          },
        ],
      },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
        keyboard_type: "iso",
      },
      profiles: [
        {
          name: "Jabel",
          keyboard_type: "iso",
          selected: true,
          virtual_hid_keyboard: {
            country_code: 0,
            keyboard_type_v2: "iso",
          },
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
