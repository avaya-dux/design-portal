export const CSSChangelog = [
  {
    version: "3.76.0",
    date: "(October 11, 2023)",
    sections: [
      {
        newFeatures: [
          "Added \"decimal\", \"boolean\" and \"integer\" icons (NEO-1865)",
          "NEO-1845 allow <a href='/components/dropdown'>Dropdown</a> to expand upwards and to be placed to either side of the toggle",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Added missing RTL styles to <a href='/components/accordion'>Accordion</a> headers (NEO-1853)",
          "Added missing alignment styling to <a href='/components/switch'>Switch</a> icons (NEO-1885)",
        ],
      },
    ],
  },

  {
    version: "3.75.0",
    date: "(September 13, 2023)",
    sections: [
      {
        newFeatures: [
          "Added \"flow\" icons (NEO-1847)",
        ],
        breakingChanges: [],
        additionalChanges: [
          "Updated \"network quality\" icons (NEO-1852)",
        ],
        bugs: [],
      },
    ],
  },

  {
    version: "3.74.0",
    date: "(August 30, 2023)",
    sections: [
      {
        newFeatures: [
          "Added \"http\" icon (NEO-1822)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.73.0",
    date: "(August 16, 2023)",
    sections: [
      {
        newFeatures: [
          "Added \"missed\" icon (NEO-1775)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.72.0",
    date: "(August 02, 2023)",
    sections: [
      {
        newFeatures: [
          "Added \"loop-single\", \"loop-multiple\", \"variable-assign\", \"sub-accounts-select\", \"sub-accounts-switch\", \"customer-journey-retrieve-data\", \"customer-journey-store-data\", \"label-go\", \"broadcast-play\", \"broadcast-stop\", \"callback-offer\", \"queue-removed\", icons (NEO-1481)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.71.0",
    date: "(July 19, 2023)",
    sections: [
      {
        newFeatures: [
          "Added \"axp\", \"axp-alerting\", \"axp-connected\", \"axp-inbound\", \"axp-missed\", \"axp-not-ready\", \"axp-outbound\", \"axp-pending\", \"axp-ready\" icons (NEO-1749)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.70.3",
    date: "(July 05, 2023)",
    sections: [
      {
        newFeatures: [],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Added missing RTL styles to expand icon in expandable <a href='/components/table'>Table</a> rows (NEO-1736)",
          "Fixed syntax issue in color variable for ACW state (NEO-1747)",
          "Tweaked behavior of Spinner animation to avoid shifting on rotation (NEO-1002)",
        ],
      },
    ],
  },

  {
    version: "3.70.2",
    date: "(June 21, 2023)",
    sections: [
      {
        newFeatures: [],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Tweaked <a href='/components/table'>Table</a> Header Filters Cell focus style, tweaked size and alignment of Cell dropdown (NEO-1690)",
          "Fixed issue where <a href='/components/select'>Select</a> content was being cut-off in Native <a href='/components/select'>Select</a> used in <a href='/components/pagination'>Pagination</a> (NEO-1023)",
          "Fixed misc. styling issues with <a href='/components/select'>MultiSelect</a> used in <a href='/components/pagination'>Pagination</a>",
          "Fixed RTL issue <a href='/components/select'>MultiSelect</a> with <a href='/components/chip'>Chips</a>",
        ],
      },
    ],
  },

  {
    version: "3.70.1",
    date: "(June 01, 2023)",
    sections: [
      {
        newFeatures: [],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Adjusted focus style on <a href='/components/checkbox'>Checkboxes</a> to be consistent with other <a href='/components/form'>Form</a> elements (NEO-1689)",
          "Fixed issue with Panel border color variable definition",
          "Fixed misconfigured <a href='/components/link'>Link</a> hover color variable",
        ],
      },
    ],
  },

  {
    version: "3.70.0",
    date: "(May 31, 2023)",
    sections: [
      {
        newFeatures: [
          "Updated Neo color library with set of new colors (NEO-1485)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.69.2",
    date: "(May 04, 2023)",
    sections: [
      {
        newFeatures: [],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Fixd text color of disabled sub menu (NEO-1561)",
          "Tweaked styling of <a href='/components/dropdown'>Dropdown</a>s and <a href='/components/form'>Form</a> elements in <a href='/components/table'>Table</a> Actions (NEO-1500)",
          "Fixed alignment of <a href='/components/tooltip'>Tooltips</a> on Condensed Left Navigation (NEO-1461)",
          "Fixed positioning and RTL styling of toggle <a href='/components/buttons'>Button</a> in Condensed Left Navigation",
          "ixed rotation of chevron icon in expanded Left Navigation items when in RTL mode",
        ],
      },
    ],
  },

  {
    version: "3.69.0",
    date: "(April 19, 2023)",
    sections: [
      {
        newFeatures: [
          "Added new \"mic-extended-off\", \"mic-extended-on\", \"vdn-incoming-call\", \"user-return\", \"list-number-complete\", \"zoom-default\", \"call-sms\", \"table-insert\", \"table-delete\" icons (NEO-1556/NEO-1555/NEO-1563)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.68.2",
    date: "(April 05, 2023)",
    sections: [
      {
        newFeatures: [
          "Added new <em class=changelog-emphasis>.neo-leftnav__sub--multiline</em> class to correctly align active state dot when text wraps to multiple lines (NEO-1497)",
          "Updated \"error\", \"error-filled\", \"warning\", \"warning-filled\" icons to new versions (NEO-1535)",
          "Added new iconography to <a href='/components/switch'>Switch</a> Component unchecked and checked states (NEO-1541)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Fixed issue where <em class=changelog-emphasis>.neo-light</em> class was applying unintended text styling to child elements (NEO-1521)",
        ],
      },
    ],
  },

  {
    version: "3.68.1",
    date: "(March 22, 2023)",
    sections: [
      {
        newFeatures: [
          "Added <em class=changelog-emphasis>neo-leftnav__main__item</em> class for additional flexibility when building Component (NEO-1433)",
          "Added new acw state icon to Icon State Component (NEO-1508)",
          "Added new <em class=changelog-emphasis>neo-radio--multiline</em> class to correctly align text in <a href='/components/radio'>Radio Buttons</a> with multiple lines of text (CCNXT-108299)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Tweaked <em class=changelog-emphasis>neo-dropdown-link--active</em> class styles (NEO-1367)",
          "Fixed issue with background color of <a href='/components/dropdown'>Dropdown</a> links on hover when used with shortcut",
          "Fixed alignment of <a href='/components/table'>Table</a> header cells with filters (NEO-1504)",
          "Added more relaxed CSS rules for <a href='/components/text-input'>Text Input</a> error state (NEO-1474)",
        ],
      },
    ],
  },

  {
    version: "3.68.0",
    date: "(March 02, 2023)",
    sections: [
      {
        newFeatures: [
          "Added new <em class=changelog-emphasis>neo-icon--small, neo-icon--medium and neo-icon--large</em> classes for specific icon sizing (NEO-645)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.67.0",
    date: "(February 22, 2023)",
    sections: [
      {
        newFeatures: [
          "Added new <em class=changelog-emphasis>.neo-input-editable__wrapper--small</em> class name for correct styling of small <a href='/components/text-input'>Text Inputs</a> (NEO-1402)",
          "Added new icon \"unlock\" (NEO-1416)",
          "Added new <em class=changelog-emphasis>.neo-form-control--no-label</em> class to remove minimum height on horizontal <a href='/components/form'>Form</a> elements (NEO-1438)",
        ],
        breakingChanges: [
          "Fixed below css selectors for disabled tertiary <a href='/components/buttons'>Button</a> and disabled circle primary <a href='/components/buttons'>Buttons</a> [https://design.avaya.com/components/web/buttons-web]: including <em class=changelog-emphasis>.neo-btn-tertiary--primary[disabled], .neo-btn-tertiary--[status-code][disabled], neo-btn-circle-primary--primary[disabled], neo-btn-circle-primary--[status-code][disabled]</em>, where [status-code] could be one of the six codes: default, success, alert, warning, info, or event (NEO-1448)",
        ],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.66.0",
    date: "(February 08, 2023)",
    sections: [
      {
        newFeatures: [
          "New <em class=changelog-emphasis>.neo-link--inline</em> class for correct styling of inline anchor elements (NEO-1392)",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Provide style tweaks for <a href='/components/dropdown'>Dropdown</a> in <a href='/components/header'>Navbar</a> (NEO-1262)",
          "Tweaked display and alignment styles for chevron in <a href='/components/table'>Table</a> Headers with sorting icons (NEO-1405)",
          "Tweaked positioning of <a href='/components/radio'>Radio Buttons</a> in <a href='/components/widget'>Widget</a> Components to avoid border cut-off on focus (CCNXT-108310)",
        ],
      },
    ],
  },

  {
    version: "3.65.0",
    date: "(December 13, 2022)",
    sections: [
      {
        newFeatures: [
          "New \"cell\", \"column\", \"row\", \"table\" and \"cut\" icons",
          "Added new class and style for small <a href='/components/select'>Select</a> Component",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.64.0",
    date: "(November 23, 2022)",
    sections: [
      {
        newFeatures: [
          "Added new <em class=changelog-emphasis>.neo-panel</em> styles",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Added <em class=changelog-emphasis>.neo-leftnav__sub__item</em> style to allow descendant anchor element in Left Nav",
        ],
      },
    ],
  },

  {
    version: "3.63.0",
    date: "(November 11, 2022)",
    sections: [
      {
        newFeatures: [
          "Added new communication icons, including \"audio-incoming\", \"audio-outgoing\", \"call-incoming\", \"call-outgoing\", \"chat-incoming\", \"chat-outgoing\", \"email-incoming\", \"email-outgoing\", \"messaging-incoming\", \"messaging-outgoing\", \"sms-incoming\", \"sms-outgoing\", \"social-incoming\", \"social-outgoing\", \"video-incoming\", and \"video-outgoing\", to icon",
        ],
        breakingChanges: [
          "Updated SVGs for social icons, including social-outbound, social-inbound, social-ready, social-missed, social-alerting, social-pending, social-not-ready, and social-connected. And moved these icons to communication category in Icon",
          "Renamed icon other/social-integrations to communication/social in icon",
          "Renamed social/social icon (illustration of thumbs up) to social/social-media in icon",
        ],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.62.0",
    date: " (October 17, 2022)",
    sections: [
      {
        newFeatures: [
          "Added redial icon icon",
          "Added new style properties for icon <a href='/components/buttons'>Button</a> <a href='/components/dropdown'>Dropdowns</a>",
          "Added new style properties for <a href='/components/header'>Navbar</a> icon <a href='/components/buttons'>Button</a> <a href='/components/dropdown'>Dropdown</a>",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Added missing RTL styles to <a href='/components/buttons'>Buttons</a> in <a href='/components/dropdown'>Dropdowns</a> with Inputs to fix misalignment",
          "Add back <em class=changelog-emphasis>.neo-form and .neo-form-control</em> styles inside <a href='/components/header'>Navbar</a>",
          "Added transparent border to <a href='/components/header'>Navbar</a> <a href='/components/buttons'>Button</a>s to preserve alignment between <a href='/components/buttons'>Button</a>s in active state",
          "Removed styles associated with :empty selector in <a href='/components/avatar'>Avatars</a> in <a href='/components/header'>Navbar</a> that were causing unintentional layout issues",
        ],
      },
    ],
  },

  {
    version: "3.61.0",
    date: "(September 21, 2022)",
    sections: [
      {
        newFeatures: [
          "Added <em class=changelog-emphasis>.neo-widget__content--borderless</em> utility class for borderless <a href='/components/widget'>Widget</a> Component",
        ],
        breakingChanges: [
          "Changed line-height and padding values on <a href='/components/checkbox'>Checkboxes</a> to treat alignment issues",
          "Changed margin property on <a href='/components/checkbox'>Checkboxes</a> in <a href='/components/table'>Tables</a> to correctly align <a href='/components/tooltip'>Tooltips</a>",
          "Removed margins between <a href='/components/pagination'>Pagination</a> items",
        ],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.60.0",
    date: "(August 30, 2022)",
    sections: [
      {
        newFeatures: [
          "Added new \"bot-agent\" and \"hospitality\" icon",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.59.2",
    date: "(August 25, 2022)",
    sections: [
      {
        newFeatures: [
          "Added 1px margin to <em class=changelog-emphasis>.neo-form</em> class when used in <a href='/components/widget'>Widget</a> Component",
          "Tweaked class name for <a href='/components/tooltip'>Tooltips</a> to avoid issues with toggling collapsed Left Navigation",
          "Added properties to <a href='/components/avatar'>Avatars</a> in <a href='/components/header'>Navbar</a> Components to avoid issues in RTL",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.59.0",
    date: "(August 10, 2022)",
    sections: [
      {
        newFeatures: [
          "Added \"after-work-call\" icon",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "test-API-pull",
    date: "(March 07, 2023)",
    sections: [
      {
        newFeatures: [],
        breakingChanges: [],
        additionalChanges: ["Updated this release description via API"],
        bugs: [],
      },
    ],
  },

  {
    version: "3.58.0",
    date: "(August 04, 2022)",
    sections: [
      {
        newFeatures: [
          "Added new classes and styles for Select All row in <a href='/components/table'>Tables</a>",
        ],
        breakingChanges: [],
        additionalChanges: [
          "Changed role to <a href='/components/switch'>Switch</a> from default one, <a href='/components/checkbox'>Checkbox</a> switches",
        ],
        bugs: [
          "Multiline <a href='/components/switch'>Switch</a>: no longer bold text when on switches",
        ],
      },
    ],
  },

  {
    version: "3.57.1",
    date: "(July 29, 2022)",
    sections: [
      {
        newFeatures: [],
        breakingChanges: [],
        additionalChanges: [],
        bugs: ["Fixed vertical misalignment of label texts between switches"],
      },
    ],
  },

  {
    version: "3.57.0",
    date: "(July 27, 2022)",
    sections: [
      {
        newFeatures: [
          "Added new \"analytics-filled\" icon",
        ],
        breakingChanges: [
          "Updated multiline <a href='/components/switch'>Switch</a> to work with <em class=changelog-emphasis>dir='rtl'</em>",
        ],
        additionalChanges: [],
        bugs: [
          "Updated cursor styles in <a href='/components/breadcrumb'>Breadcrumbs</a> component",
          "Updated pulse width to 15px from 10px",
          "Updated <a href='/components/notifications'>Notifications</a> to work with <em class=changelog-emphasis>dir='rtl'</em>",
          "Updated <a href='/components/buttons'>Button</a>s and <a href='/components/header'>Navbar</a> with improved btn hover styles",
        ],
      },
    ],
  },

  {
    version: "3.56.0",
    date: "(July 13, 2022)",
    sections: [
      {
        newFeatures: [
          "Added new classes for stacked <a href='/components/accordion'>Accordion</a> Component",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Updated Skip Nav to work with <em class=changelog-emphasis>dir='rtl'</em>",
          "Fixed issue with layout shift when toggling error messages in <a href='/components/form'>Form</a> Layout",
          "Fixed CSS issue with <a href='/components/header'>Navbar</a> search input",
        ],
      },
    ],
  },

  {
    version: "3.54.2",
    date: "(May 04, 2022)",
    sections: [
      {
        newFeatures: [],
        breakingChanges: [
          "Available May 11, 2022: Changed naming convention for all data visualization colors, added additional colors for light and dark mode",
        ],
        additionalChanges: [],
        bugs: [
          "Reverted changes to <a href='/components/form'>Form</a> Layout elements that caused layout issues",
          "Corrected hover color on <a href='/components/accordion'>Accordions</a>",
        ],
      },
    ],
  },

  {
    version: "3.54.1",
    date: "(April 27, 2022)",
    sections: [
      {
        newFeatures: [],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Fixed background color issue on chevron in disabled <a href='/components/select'>Selectbox</a> Component",
          "Removed redundant 'height' and 'width' properties from Tooltip Components causing alignment issues when used in <a href='/components/header'>Navbar</a>",
          "Added new <em class=changelog-emphasis>justify-content</em> property to Category items in Left Navigation Component.",
        ],
      },
    ],
  },

  {
    version: "3.54.0",
    date: "(April 06, 2022)",
    sections: [
      {
        newFeatures: [
          "Added new \"user\" icon",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [],
      },
    ],
  },

  {
    version: "3.53.0",
    date: "(March 30, 2022)",
    sections: [
      {
        newFeatures: [
          "Added new acw colors to <a href='/components/header'>Navbar</a> Component",
        ],
        breakingChanges: [],
        additionalChanges: [],
        bugs: [
          "Added transparent border to <a href='/components/tab'>Tab</a> to avoid layout shift on active/hover",
          "Added correct input height and active state styles for rows in <a href='/components/table'>Table</a> Components",
          "Increased padding on label of read-only <a href='/components/text-input'>Text Input</a> Components",
          "Moved style properties in <a href='/components/accordion'>Accordion</a> Components for correct behaviour of chevron",
        ],
      },
    ],
  },
];
