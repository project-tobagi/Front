export const saveClipboardText = async (
    contents: string,
    type: string,
    toast: any
) => {
    try {
        await navigator.clipboard.writeText(contents);

        toast.success(`클립보드에 ${type}를 저장했습니다.`, {
            position: "top-right",
        });
    } catch (err) {
        console.log("텍스트 복사에 실패했습니다.");
    }
};
