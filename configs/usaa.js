exports.getUSAAConfig = (start, size, query="") => {
    return {
        "appliedFacets": {
            "jobFamilyGroup": [
                "e283bdbc2d1210875c917eefd15f0bf7",
                "e283bdbc2d1210875c9178c49ddb0bf3",
                "e283bdbc2d1210875c919cc791cf0c0d"
            ]
        },
        "limit": size,
        "offset": start,
        "searchText": query
    }
}