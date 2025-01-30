import React from "react";
import styles from "./MemberSection.module.scss";
import defaultImage from "../../assets/male.png";

type Member = {
    name: string;
};

interface MemberSectionProps {
    members: Member[];
}

const MemberSection = ({ members }: MemberSectionProps) => {
    return (
        <div className={styles.membersFrame}>
            {members.map((member, idx) => (
                <div className={styles.memberDiv} key={idx}>
                    <img src={defaultImage} alt="Member" />
                    <p>{member.name}님</p>
                </div>
            ))}
        </div>
    );
};

export default MemberSection;
