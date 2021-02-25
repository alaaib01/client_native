const FormExample = [
    {
        "type": 1,
        "resetInUnmount": false,
        "propName": "dropDown",
        "helperText": "helper Text",
        "key": "key",
        "title": "title",
        "subText": "sub text",
        "placeHolder": "asdasd",
        "childComponents": [
            {
                "propName": "radioList",
                "type": 0,
                "component": {
                    "type": 0,
                    "resetInUnmount": false,
                    "propName": "radioListComp",
                    "helperText": "helper Text",
                    "key": "key",
                    "title": "title",
                    "subText": "sub text",
                    "childComponents": [
                        {
                            "propName": "simpleText1",
                            "type": 1000,
                            "text": "SimpleText1",
                            "value": 122,
                            "component": {
                                "type": 0,
                                "resetInUnmount": false,
                                "propName": "radioListComp",
                                "helperText": "helper Text",
                                "key": "key",
                                "title": "title",
                                "subText": "sub text",
                                "childComponents": [{
                                    "propName": "simpleText2",
                                    "type": 1000,
                                    "text": "SimpleText2",

                                    "value": 123
                                }]
                            }
                        },
                        {
                            "propName": "simpleText2",
                            "type": 1000,
                            "text": "SimpleText2",

                            "value": 123
                        }
                    ]
                },
                "text": "radiolstTxt",
                "value": 1
            },
            {
                "propName": "simpleText4",
                "type": 1000,
                "text": "SimpleText4",
                "value": 2
            },
        ]
    }
]

export default FormExample