<?php $whitelist = array('127.0.0.1', "::1");
	if(!in_array($_SERVER['REMOTE_ADDR'], $whitelist)){?>
    <meta name="robots" content="index, follow" />
    <meta name="google-site-verification" content="us-eLkBuj01lSPS-vZFfgtkCfc1TcXmjtwDvKsFPQFY" />

<!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-79732653-1"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-79732653-1');
    </script>
<!-- Global site tag (gtag.js) - Google Ads: 877750921 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-877750921"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-877750921');
    </script>

<?php }else{ /*echo "<br>We are on Localhost";*/}?>