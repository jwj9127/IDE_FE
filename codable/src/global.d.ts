// module.scss 사용을 위한 파일 추가
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
