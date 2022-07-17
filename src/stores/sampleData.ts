export const data = {
  "plans": [
    {
      "name": "Plan 1",
      "description": "Description of Plan 1",
      "status": "Active",
      "id": "P1",
      "type": "Plan",
      "children": [
        {
          "name": "Sbf 1",
          "id": "SBF1",
          "type": "Sub Business Function",
          "children": [
            {
              "name": "Act 1",
              "id": "ACT1",
              "type": "Activity"
            }
          ]
        },
        {
          "name": "Sbf 2",
          "id": "SBF2",
          "type": "Sub Business Function"
        }
      ]
    },
    {
      "name": "Plan 2",
      "description": "Description of Plan 2",
      "status": "Inactive",
      "id": "P2",
      "type": "Plan",
      "children": [
        {
          "name": "Sbf 2-1",
          "id": "SBF2-1",
          "type": "Sub Business Function",
          "children": [
            {
              "name": "Act 1",
              "id": "ACT1",
              "type": "Activity"
            }
          ]
        },
        {
          "name": "Sbf 2-2",
          "id": "SBF2-2",
          "type": "Sub Business Function"
        },
        {
          "name": "Sbf 2-3",
          "id": "SBF2-3",
          "type": "Sub Business Function",
          "children": [
            {
              "name": "Act 2-3-1",
              "id": "ACT2-3-1",
              "type": "Activity"
            }
          ]
        }
      ]
    }
  ]
}
