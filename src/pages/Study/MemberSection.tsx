import React from "react";
import styles from "./MemberSection.module.scss";
import defaultImage from "../../assets/male.png";

type Member = {
    name: string;
};

type LoginMember = {
    name: string;
};

interface MemberSectionProps {
    members: Member[];
    loginMember: LoginMember | null;
}

const MemberSection = ({ members, loginMember }: MemberSectionProps) => {
    return (
        <div className={styles.membersFrame}>
            {members.map((member, idx) => (
                <div
                    key={idx}
                    className={styles.memberDiv}
                    style={{
                        backgroundColor: loginMember?.name === member.name ? "#8b8b8b" : "#e3e3e3", 
                    }}
                >
                    <img src={defaultImage} alt="Member" />
                    <p>{member.name}님</p>
                </div>
            ))}
        </div>
    );
};

export default MemberSection;
