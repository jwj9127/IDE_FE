import React from "react";
import styles from "./RulesSection.module.scss";

const RulesSection = () => {
    const rules = Array(5).fill("최대한 검색하지 않고 자신의 실력으로 코딩하기");

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
