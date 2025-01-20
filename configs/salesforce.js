
exports.getSalesforceConfig = (start, size, query="") => {
    return {
        "appliedFacets": {
            "jobFamilyGroup": [
                "14fa3452ec7c1011f90d0002a2100000"
            ],
            "CF_-_REC_-_LRV_-_Job_Posting_Anchor_-_Country_from_Job_Posting_Location_Extended": [
                "bc33aa3152ec42d4995f4791a106ed09"
            ]
        },
        "limit": size,
        "offset": start,
        "searchText": query
    }
}