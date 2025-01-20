
exports.getAmazonConfig = (start, size, query="") => {
    return {
        "accessLevel": "EXTERNAL",
        "contentFilterFacets": [
            {
                "name": "primarySearchLabel",
                "requestedFacetCount": 9999
            }
        ],
        "excludeFacets": [
            {
                "name": "isConfidential",
                "values": [
                    {
                        "name": "1"
                    }
                ]
            },
            {
                "name": "businessCategory",
                "values": [
                    {
                        "name": "a-confidential-job"
                    }
                ]
            }
        ],
        "filterFacets": [
            {
                "name": "category",
                "requestedFacetCount": 9999,
                "values": [
                    {
                        "name": "Software Development"
                    }
                ]
            }
        ],
        "includeFacets": [],
        "jobTypeFacets": [
            {
                "name": "scheduleTypeId",
                "values": [
                    {
                        "name": "Full-Time"
                    }
                ]
            }
        ],
        "locationFacets": [
            [
                {
                    "name": "country",
                    "requestedFacetCount": 9999,
                    "values": [
                        {
                            "name": "US"
                        }
                    ]
                },
                {
                    "name": "normalizedStateName",
                    "requestedFacetCount": 9999
                },
                {
                    "name": "normalizedCityName",
                    "requestedFacetCount": 9999
                }
            ]
        ],
        "query": query,
        "size": size,
        "start": start,
        "sort": {
            "sortOrder": "DESCENDING",
            "sortType": "CREATED_DATE"
        }
    }
}