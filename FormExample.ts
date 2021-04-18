const FormExample = [
    {
        "data": [
            {
                "type": 0,
                "resetInUnmount": true,
                "propName": "AbleToAct",
                "helperText": "",
                "uid": "ableToAct",
                "title": "ניתן לבצע משימה ",
                "subTitle": "",
                "placeHolder": "",
                "childComponents": {
                    "children": [
                        {
                            "type": 1000,
                            "resetInUnmount": true,
                            "propName": "yesAble",
                            "helperText": "",
                            "uid": "yesAble",
                            "title": "כן",
                            "subTitle": "",
                            "placeHolder": "",
                            "label": "כן",
                            "componentId": "1"
                        },
                        {
                            "type": 1000,
                            "resetInUnmount": true,
                            "propName": "notAble",
                            "helperText": "",
                            "uid": "notAble",
                            "title": "לא",
                            "subTitle": "",
                            "placeHolder": "",
                            "label": "לא",
                            "componentId": "1"
                        }
                    ],
                    "components": [
                        {
                            "id": "1",
                            "component": {
                                "type": 4,
                                "resetInUnmount": false,
                                "propName": "",
                                "helperText": "",
                                "uid": "ui9",
                                "title": "מסמכים",
                                "subTitle": "",
                                "placeHolder": "",
                                "finalStep": true
                            }
                        },
                        {
                            "id": "2",
                            "component": {
                                "type": 0,
                                "resetInUnmount": true,
                                "propName": "AbleToAct",
                                "helperText": "",
                                "uid": "ableToAct",
                                "title": "ניתן לבצע משימה ",
                                "subTitle": "",
                                "placeHolder": "",
                                "childComponents": {
                                    "children": [
                                        {
                                            "type": 1000,
                                            "resetInUnmount": true,
                                            "propName": "destroyed",
                                            "finalStep": true,
                                            "helperText": "",
                                            "uid": "destroyed",
                                            "title": "הרוס",
                                            "subTitle": "",
                                            "placeHolder": "",
                                            "label": "הרוס",
                                            "componentId": "1"
                                        },
                                        {
                                            "type": 1000,
                                            "resetInUnmount": true,
                                            "propName": "constraction",
                                            "helperText": "",
                                            "uid": "constraction",
                                            "title": "בבנייה",
                                            "subTitle": "",
                                            "placeHolder": "",
                                            "label": "בבנייה",
                                            "componentId": "1"
                                        },
                                        {
                                            "type": 1000,
                                            "resetInUnmount": true,
                                            "propName": "notFound",
                                            "helperText": "",
                                            "uid": "notFound",
                                            "title": "לא אותר",
                                            "subTitle": "",
                                            "placeHolder": "",
                                            "label": "לא אותר",
                                            "componentId": "1"
                                        },
                                        {
                                            "type": 1000,
                                            "resetInUnmount": true,
                                            "propName": "unableToMeasurement",
                                            "helperText": "",
                                            "uid": "unableToMeasurement",
                                            "title": "לא ניתן לבצע הערכ",
                                            "subTitle": "",
                                            "placeHolder": "",
                                            "label": "לא ניתן לבצע הערכ",
                                            "componentId": "2"
                                        },
                                    ],
                                    "components": [
                                        {
                                            "id": "1",
                                            "component": {
                                                "type": 1000,
                                                "resetInUnmount": true,
                                                "propName": "fin",
                                                "helperText": "",
                                                "uid": "fin",
                                                "title": "",
                                                "subTitle": "",
                                                "placeHolder": "",
                                                "multiLine": true,
                                                "finalStep": true
                                            }
                                        },
                                        {
                                            "id": "2",
                                            "component": {
                                                "type": 3,
                                                "resetInUnmount": true,
                                                "propName": "unableComments",
                                                "helperText": "",
                                                "uid": "unableComments",
                                                "title": "הערות",
                                                "subTitle": "",
                                                "placeHolder": "נא לצין הערות",
                                                "multiLine": true,
                                                "finalStep": true
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            },
            {
                "type": 2,
                "resetInUnmount": true,
                "propName": "unableToTakePic",
                "helperText": "",
                "uid": "unableToTakePic",
                "title": "",
                "subTitle": "",
                "placeHolder": "",
                "finalStep": true,
                "childComponents": {
                    "children": [
                        {
                            "type": 1000,
                            "resetInUnmount": true,
                            "propName": "unableToTackImage",
                            "helperText": "",
                            "uid": "unableToTackImage",
                            "title": "",
                            "subTitle": "",
                            "placeHolder": "",
                            "label": "לא ניתן לצלם",
                            "componentId": "1",
                            "finalStep": true
                        }
                    ],
                    "components": [
                        {
                            "id": "1",
                            "component": {
                                "type": 3,
                                "resetInUnmount": true,
                                "propName": "imageComments",
                                "helperText": "",
                                "uid": "imageComments",
                                "title": "הערות",
                                "subTitle": "",
                                "placeHolder": "נא לצין הערות",
                                "multiLine": true,
                                "finalStep": true
                            }
                        }
                    ]
                }
            }
        ],
        "createBy": "2020-03-15",
        "createDate": 1615120571042,
        "project": 2,
        "formName": null,
        "type": 7
    }
]
export default FormExample