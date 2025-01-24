
exports.getUberConfig = (page, size, query="") => {
    return {
        "limit": size,
        "page": page,
        "params": {
            "location": [
                {
                    "country": "USA",
                    "region": "California",
                    "city": "San Francisco"
                },
                {
                    "country": "USA",
                    "region": "California",
                    "city": "Culver City"
                },
                {
                    "country": "USA",
                    "region": "California",
                    "city": "Sunnyvale"
                },
                {
                    "country": "USA",
                    "region": "New York",
                    "city": "New York"
                },
                {
                    "country": "USA",
                    "region": "Illinois",
                    "city": "Chicago"
                },
                {
                    "country": "USA",
                    "region": "Texas",
                    "city": "Dallas"
                },
                {
                    "country": "USA",
                    "region": "Washington",
                    "city": "Seattle"
                },
                {
                    "country": "USA",
                    "region": "Arizona",
                    "city": "Phoenix"
                },
                {
                    "country": "USA",
                    "region": "District of Columbia",
                    "city": "Washington"
                },
                {
                    "country": "USA",
                    "region": "Pennsylvania",
                    "city": "Philadelphia"
                },
                {
                    "country": "USA",
                    "region": "Pennsylvania",
                    "city": "Pittsburgh"
                },
                {
                    "country": "USA",
                    "region": "Colorado",
                    "city": "Denver"
                },
                {
                    "country": "USA",
                    "region": "Georgia",
                    "city": "Atlanta"
                },
                {
                    "country": "USA",
                    "region": "Massachusetts",
                    "city": "Boston"
                }
            ],
            "department": [
                "Engineering",
                "Data Science",
                "University"
            ],
            "query": ""
        }
    }
}