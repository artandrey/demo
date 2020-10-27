const elem = document.querySelector('check');
if (elem) {
    window.addEventListener("load", function() {
        let utm_term = window.location.href.match(/utm_term=(.*?)(&|$)/);
        if (Array.isArray(utm_term)) utm_term = utm_term[1];
            else utm_term = "";
        window.history.pushState({action: "fake"}, null);
        window.history.pushState(null, null);
        window.addEventListener('popstate', function(e) {if ((e.state) && (e.state.action=="fake")) window.location = "page2.html"});;
        });
}