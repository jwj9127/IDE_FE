import React from "react";
import styles from "./MemberSection.module.scss";

type Member = {
    image: string;
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
                    <img src={member.image} alt="Member" />
                    <p>{member.name}님</p>
                </div>
            ))}
        </div>
    );
};

export default MemberSection;
