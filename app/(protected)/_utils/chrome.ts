export const isChormeBrowser = () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isChrome =
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor);
    const isKakao = /KAKAOTALK/i.test(navigator.userAgent);

    if (isKakao) {
        return false;
    }

    return isSafari || isChrome;
};
