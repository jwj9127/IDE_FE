import React from "react";
import styles from "./RulesSection.module.scss";

const RulesSection = () => {
    const rules: string[] = [
        "문제 풀이 시 검색 전에 먼저 스스로 고민하기",
        "구현 전에 sudo code를 설계하고 코드 작성하기",
        "문제풀이 후 반드시 코드 리뷰 진행하기",
        "틀린 문제는 복습 후 블로그에 풀이 정리하기",
        "불가피한 사유로 결석 시 3일 전에 양해 구하기"
    ];
    

    return (
        <div className={styles.rulesText}>
            <p>설명 & 룰</p>
            <div className={styles.subText}>
                <ul>
                    {rules.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RulesSection;
