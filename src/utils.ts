interface deviceInter {
    match: Fn;
}

export const deviceDetection = () => {
    const sUserAgent: deviceInter = navigator.userAgent.toLowerCase();
    const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    const bIsAndroid = sUserAgent.match(/android/i) == "android";
    const bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    return (
        bIsIphoneOs || bIsIpad || bIsAndroid || bIsWM
    );
};
