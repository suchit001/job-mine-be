
exports.getNvidiaConfig = (start, size, query = "") => {
    return {
        "appliedFacets": {
            "jobFamilyGroup": [
                "0c40f6bd1d8f10ae43ffaefd46dc7e78"
            ],
            "locationHierarchy1": [
                "2fcb99c455831013ea52fb338f2932d8"
            ]
        },
        "limit": size,
        "offset": start,
        "searchText": query
    }
}