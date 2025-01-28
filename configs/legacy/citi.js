exports.getCitiConfig = (start, size, query="") => {
    return {
        "appliedFacets": {
            "Country_and_Jurisdiction": [
                "bc33aa3152ec42d4995f4791a106ed09"
            ],
            "jobFamilyGroup": [
                "538c239234271000c428fd3827220000",
                "e32326e1708d01575bddff0c120102c1",
                "e32326e1708d019ce585000d120104c1"
            ]
        },
        "limit": size,
        "offset": start,
        "searchText": query
    }
}