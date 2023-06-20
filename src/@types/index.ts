export type ProjectsTypeProps = {
    id: string;
    name: string;
    link_deploy: string;
    banner: string;
    thumbnail: string;
    description: string;
    techs: LinksTypeProps;
}

export type LinksTypeProps = {
    links: TechsTypeProps[]
}

export type TechsTypeProps = {
    id: string;
    svg_name: string;
    link: string;
    svg_link: string;
}

export type SkillsTypeProps = {
    id: string;
    svg: string;
    link: string;
    skill_name: string;
    description: string;
}

export type SoftskillsTypeProps = {
    id: string;
    name: string;
}

export type CardContainerStyleProps = {
    banner: string;
}

export type ImageProps = {
    src: string;
    alt: string;
}

export type SkillDescriptonTypeProps = {
    skillName: string;
    skillDescription: string;
}