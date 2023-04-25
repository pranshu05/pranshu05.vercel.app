<?php
// Retrieve visitor's IP address
$ip = $_SERVER['REMOTE_ADDR'];

// Retrieve location data using IP-API
$locationData = json_decode(file_get_contents("http://ip-api.com/json/{$ip}"));

// Get the country flag emoji based on the ISO country code
$countryFlag = '';
if (!empty($locationData->countryCode)) {
    $countryCode = strtolower($locationData->countryCode);
    $countryFlag = str_replace('flag-', '', $countryCode);
    $countryFlag = html_entity_decode('&#x1F1' . strtoupper($countryFlag{0}) . '&#x1F1' . strtolower($countryFlag{1}));
}

// Get the visiting page location
$visitingPage = "http" . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "s" : "") . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";

// Format the message
$message = date('Y-m-d H:i:s') . ", {$ip}, {$locationData->city}, {$locationData->regionName}, {$locationData->country} {$countryFlag} --> {$visitingPage}";

// Send message to Discord webhook
$webhookUrl = 'https://discord.com/api/webhooks/https://discord.com/api/webhooks/1100272235740139610/iCHXpOVRBUmeMmIi5Zh1PAPZjfHQiVYKmHzkENYCxBOl2aLs-Uef0UngLvAgVJTj-1Qe';
$data = array('content' => $message);
$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data),
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($webhookUrl, false, $context);
?>
