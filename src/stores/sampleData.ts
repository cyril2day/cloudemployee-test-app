export const data = {
  "plans": [
    {
      "name": "Plan 1",
      "description": "Description of Plan 1",
      "status": "Active",
      "_id": "P1",
      "type": "Plan",
      "children": [
        {
          "name": "Sbf 1",
          "_id": "SBF1",
          "type": "Sub Business Function",
          "children": [
            {
              "name": "Act 1",
              "_id": "ACT1",
              "type": "Activity"
            }
          ]
        },
        {
          "name": "Sbf 2",
          "_id": "SBF2",
          "type": "Sub Business Function"
        }
      ]
    },
    {
      "name": "Plan 2",
      "description": "Description of Plan 2",
      "status": "Inactive",
      "_id": "P2",
      "type": "Plan",
      "children": [
        {
          "name": "Sbf 2-1",
          "_id": "SBF2-1",
          "type": "Sub Business Function",
          "children": [
            {
              "name": "Act 1",
              "_id": "ACT1",
              "type": "Activity"
            }
          ]
        },
        {
          "name": "Sbf 2-2",
          "_id": "SBF2-2",
          "type": "Sub Business Function"
        },
        {
          "name": "Sbf 2-3",
          "_id": "SBF2-3",
          "type": "Sub Business Function",
          "children": [
            {
              "name": "Act 2-3-1",
              "_id": "ACT2-3-1",
              "type": "Activity"
            }
          ]
        }
      ]
    }
  ]
}
