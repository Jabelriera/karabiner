import fs from "fs";
import {
  KarabinerRules
} from "./types";
import {
  createHyperSubLayers,
  app,
  open,
  rectangle,
  shell
} from "./utils";

const rules: KarabinerRules[] = [

  // Fix the problem with < and >
  {
    "description": "Swap < and > correctly with Shift",
    "manipulators": [{
        "type": "basic",
        "from": {
          "key_code": "non_us_backslash",
          "modifiers": {
            "optional": ["any"]
          }
        },
        "to": [{
          "key_code": "grave_accent_and_tilde"
        }]
      },
      {
        "type": "basic",
        "from": {
          "key_code": "non_us_backslash",
          "modifiers": {
            "mandatory": ["shift"]
          }
        },
        "to": [{
          "key_code": "grave_accent_and_tilde",
          "modifiers": ["shift"]
        }]
      },
      {
        "type": "basic",
        "from": {
          "key_code": "grave_accent_and_tilde",
          "modifiers": {
            "optional": ["any"]
          }
        },
        "to": [{
          "key_code": "non_us_backslash"
        }]
      },
      {
        "type": "basic",
        "from": {
          "key_code": "grave_accent_and_tilde",
          "modifiers": {
            "mandatory": ["shift"]
          }
        },
        "to": [{
          "key_code": "non_us_backslash",
          "modifiers": ["shift"]
        }]
      }
    ]
  },

  // ---------------------------------------------------------------- //
  //      HYPERKEY
  // ---------------------------------------------------------------- //
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [{
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [{
          set_variable: {
            name: "hyper",
            value: 1,
          },
        }, ],
        to_after_key_up: [{
          set_variable: {
            name: "hyper",
            value: 0,
          },
        }, ],
        to_if_alone: [{
          key_code: "escape",
        }, ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({

    spacebar: {

      to: [{
        key_code: "p",
        modifiers: ["left_command", "left_control"]
      }],
    },

    // ---------------------------------------------------------------- //
    // B = Brave / Browse
    // ---------------------------------------------------------------- //

    b: {

      spacebar: open("https://pdpaola.com"),
      l: open("https://pdpaola.cloud.looker.com"),
      m: open("https://mail.google.com"),
      x: open("https://x.com"),

      d: {
        to: [{
          key_code: "d",
          modifiers: ["left_command", "left_option"]
        }],
      },
    },

    // ---------------------------------------------------------------- //
    // J = Jira
    // ---------------------------------------------------------------- //

    j: {

      spacebar: open("raycast://extensions/thomaslombart/jira/my-filters"),

      // All ITPs
      a: open("https://pdpaola.atlassian.net/jira/polaris/projects/ITP/ideas/view/3404380"),
      // Support Tickets
      s: open("https://pdpaola.atlassian.net/jira/servicedesk/projects/IT/queues/custom/163"),
      // Developement
      d: open("https://pdpaola.atlassian.net/jira/discovery/share/views/699ad107-2f28-4bf6-a78b-51008adfeecc"),

      // Ordered from left to right (Q, W, E), the three Jira Software IT projects
      q: /*  BAB  */ open("https://pdpaola.atlassian.net/jira/software/c/projects/BAB/boards/44"),
      w: /*  COM  */ open("https://pdpaola.atlassian.net/jira/software/c/projects/COM/boards/46"),
      e: /*  DAT  */ open("https://pdpaola.atlassian.net/jira/software/c/projects/DAT/boards/45"),

      v: {
        to: [{
          key_code: "v",
          modifiers: ["left_command", "left_option"]
        }],
      },
    },

    // o = "Open" applications
    a: {
      spacebar: {
        to: [{
          key_code: "tab",
          modifiers: ["left_command", "left_option"],
        }, ],
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
      v: app("Visual Studio Code"),
      w: app("Whatsapp"),
    },

    i: {
      a: app("ChatGPT"),
    },

    // ---------------------------------------------------------------- //
    // N = Notion
    // ---------------------------------------------------------------- //
    
    n: {

      // ---------------- //
      // Quick Search     //
      // ---------------- //

      spacebar:
        /*{
               to: [{ key_code: "p", modifiers: ["left_command","left_control"] }],
             },*/
        open("notion://www.notion.so/jriera/Babylon-5286b76c5f814b5e80018c9c2f1746e5?pvs=25"),


      // ---------------- //
      // Follow-up Pages  //
      // ---------------- //

      q: /*  BAB  */ open("notion://www.notion.so/jriera/Babylon-5286b76c5f814b5e80018c9c2f1746e5?pvs=25"),
      w: /*  COM  */ open("notion://www.notion.so/jriera/Ecommerce-4d14585900d14482a6663b38e24c1460?pvs=25"),
      e: /*  DAT  */ open("notion://www.notion.so/jriera/Data-9b10c993633f4932a95742f484e96a5d?pvs=25"),
      r: /*  SYS  */ open("notion://www.notion.so/jriera/Sysadmin-4afef3fe2fdb4e58ad32d0bfe6c06195?pvs=25"),

      a: /*  CEO  */ open("notion://www.notion.so/jriera/Humbert-421761737c744a8e95065153c18fed63?pvs=4"),
      s: /* TODOs */ open("notion://www.notion.so/jriera/19e9bb54bc0380d7bf9ee11350cc13d7?v=19e9bb54bc0380c4899d000c6d019498&pvs=4"),
      d: /* Dashboard */ open("notion://www.notion.so/jriera/Control-Center-cc2d07d307174663aeee0192029d4ee5?pvs=4"),


      // ---------------- //
      // Add to Databases //
      // ---------------- //

      i: {
        // Manually add to To Do List
        to: [{
          key_code: "i",
          modifiers: ["left_command", "left_option"]
        }],
      },

      o: {
        // Manually add to Read Later List
        to: [{
          key_code: "o",
          modifiers: ["left_command", "left_option"]
        }],
      },

      k: {
        // Add to To Do List
        to: [{
          key_code: "k",
          modifiers: ["left_command", "left_option"]
        }],
      },

      l: {
        // Add to Read Later List
        to: [{
          key_code: "l",
          modifiers: ["left_command", "left_option"]
        }],
      },

    },

    // ---------------------------------------------------------------- //
    // W = Windows Management
    // ---------------------------------------------------------------- //

    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      f: {
        to: [{ shell_command: "osascript -e 'tell application \"System Events\" to keystroke \"f\" using {command down, control down}'" }],
      },
    },

    // ---------------------------------------------------------------- //
    // S = System
    // ---------------------------------------------------------------- //

    s: {
      u: {
        to: [{
          key_code: "volume_increment",
        }, ],
      },
      j: {
        to: [{
          key_code: "volume_decrement",
        }, ],
      },
      i: {
        to: [{
          key_code: "display_brightness_increment",
        }, ],
      },
      k: {
        to: [{
          key_code: "display_brightness_decrement",
        }, ],
      },
      l: {
        to: [{
          key_code: "q",
          modifiers: ["right_control", "right_command"],
        }, ],
      },
      p: {
        to: [{
          key_code: "play_or_pause",
        }, ],
      },
      semicolon: {
        to: [{
          key_code: "fastforward",
        }, ],
      },

      // "D"o not disturb toggle
      d: open(
        "raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background"
      ),
      // "T"heme
      t: open("raycast://extensions/raycast/system/toggle-system-appearance"),
      c: open("raycast://extensions/raycast/system/open-camera"),
      // 'v'oice
      v: {
        to: [{
          key_code: "spacebar",
          modifiers: ["left_option"],
        }, ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like the
    // y do in vim
    v: {
      h: {
        to: [{
          key_code: "left_arrow"
        }],
      },
      j: {
        to: [{
          key_code: "down_arrow"
        }],
      },
      k: {
        to: [{
          key_code: "up_arrow"
        }],
      },
      l: {
        to: [{
          key_code: "right_arrow"
        }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{
          key_code: "f",
          modifiers: ["right_control"]
        }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{
          key_code: "j",
          modifiers: ["right_control"]
        }],
      },
      d: {
        to: [{
          key_code: "d",
          modifiers: ["right_shift", "right_command"]
        }],
      },
      u: {
        to: [{
          key_code: "page_down"
        }],
      },
      i: {
        to: [{
          key_code: "page_up"
        }],
      },
      f: {
        to: [{
          shell_command: "osascript -e 'tell application \"System Events\" to keystroke \"f\" using {command down, control down}'"
        }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{
          key_code: "play_or_pause"
        }],
      },
      n: {
        to: [{
          key_code: "fastforward"
        }],
      },
      b: {
        to: [{
          key_code: "rewind"
        }],
      },
    },

    // ---------------------------------------------------------------- //
    // R = Raycast
    // ---------------------------------------------------------------- //

    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      g: open("raycast://extensions/josephschmitt/gif-search/search"),
      e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      h: open("raycast://extensions/raycast/clipboard-history/clipboard-history"),

      s: open("raycast://extensions/peduarte/silent-mention/index"),

      n: open("raycast://script-commands/dismiss-notifications"),

      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),

    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify({
      global: {
        show_in_menu_bar: false,
        keyboard_type: "iso"
      },
      profiles: [{
        name: "Jabel",
        keyboard_type: "iso",
        selected: true,
        virtual_hid_keyboard: {
          country_code: 0,
          keyboard_type_v2: "iso"
        },
        complex_modifications: {
          rules,
        },
      }, ],
    },
    null,
    2
  )
);