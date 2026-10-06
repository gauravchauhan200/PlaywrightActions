
    const loginTestData= [

    ["laura.taylor1234@example.com", "test123", "valid"],
    ["invaliduser@example.com", "test321", "invalid"],
    ["validuser@example.com", "testxyz", "invalid"],
    ["", "", "invalid"],
];

    function login()
    {
        console.log(loginTestData[0][0])
        console.log(loginTestData[0][1])
        console.log(loginTestData[1][1])
    }

    login();


