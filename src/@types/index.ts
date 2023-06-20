export type ProjectsTypeProps = {
    id: string;
    project_name: string;
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
    softskill_name: string;
}