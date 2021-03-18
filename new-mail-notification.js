setTimeout(() => {
    const username = "";
    const password = "";
    
    var originalTitle = document.title;
    function showNotification(info) {
        new Notification(info[0], {
            icon: "http://i.imgur.com/lJ4LbVp.png",
            body: `Subject: ${info[1]}\n${info[2]}`
        });
    }
    
    function LoginIfNecessary() {
        if (document.getElementById('mainLogonDiv')) {
            document.getElementById('username').value = username;
            document.getElementById('password').value = password;
            
            document.getElementsByClassName('signinbutton')[0].click();
        }
    }
    
    function getMailCount() {
        const mailSelector = "[title=Posteingang]";
        let span = document.querySelector(mailSelector);
        while (span) {
            const value = span.innerText;
            if (isNumeric(value)) {
                return parseInt(value);
            }
            span = span.nextElementSibling;
        }
        return 0;
    }
    
    function getNotificationCount() {
        const span = document.querySelector('span._f_k4');
        if (span) {
            return parseInt(span.innerText) || 0;
        }
        return 0;
    }
    
    function updateBadge(e) {
        e >= 1 ? document.title = "(" + e + ") " + originalTitle : document.title = originalTitle
    }
    
    function isNumeric(value) {
        return !isNaN(value) && !isNaN(parseFloat(value));
    }
    
    LoginIfNecessary();
    
    setInterval(() => {
        LoginIfNecessary();
    
        const notifications = getNotificationCount();
        const mails = getMailCount();
        const badgeCnt = notifications + mails;
        updateBadge(badgeCnt);
    }, 3000);
    
}, 100);
