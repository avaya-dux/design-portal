export const updates = [
    {
        version: "3.70.2",
        date: "(July 05, 2023)",
        sections: [
            {
                newFeatures: [],
                breakingChanges: [],
                additionalChanges: [],
                bugs: [
                    "Adjusted focus style on checkboxes to be consistent with other form elements (NEO-1689)",
                    "Fixed issue with Panel border color variable definition",
                    "Fixed misconfigured Link hover color variable",
                ],
                sunsetting: [],
                workInProgress: []
            },
        ]
    },

    {
        version: "3.70.1",
        date: "(June 01, 2023)",
        sections: [
            {
                newFeatures: [
                    "Updated Neo color library with set of new colors (NEO-1485)"
                ],
                breakingChanges: [],
                additionalChanges: [],
                bugs: [
                    "Added missing RTL styles to buttons in Dropdowns with Inputs to fix misalignment (Neo-1234).",
                    "Add back .neo-form and .neo-form-control styles inside Navbar (Neo-1234).",
                    "Added transparent border to Navbar buttons to preserve alignment between buttons in active state (Neo-1234).",
                    "Removed styles associated with :empty selector in Avatars in Navbar that were causing unintentional layout issues (Neo-1234).",
                ],
                sunsetting: [],
                workInProgress: []
            },
        ]
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
                    "Tweaked Table Header Filters Cell focus style, tweaked size and alignment of Cell dropdown (NEO-1690)",
                    "Fixed issue where Select content was being cut-off in Native Select used in Pagination (NEO-1023)",
                    "Fixed misc. styling issues with Multiselect used in Pagination",
                    "Fixed RTL issue Multiselect with Chips",
                ],
                sunsetting: [],
                workInProgress: []
            },
        ]
    }
];