
exports.getGEICOConfig = (start, size, query="") => {
    return {
        "appliedFacets": {
            "jobFamilyGroup": [
                "a35ed0a458b310010910c29142fd0000",
                "da128ce5a1dc103e7c09aaa3fe312266"
            ]
        },
        "limit": size,
        "offset": start,
        "searchText": query
    }
}