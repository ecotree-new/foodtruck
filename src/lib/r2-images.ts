const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

export const HOMEPAGE_IMAGES = {
  main: {
    hero_video: `${R2_BASE}/homepage/main/hero-video.mp4`,
    business_area_01: `${R2_BASE}/homepage/main/business-area-01.webp`,
    business_area_02: `${R2_BASE}/homepage/main/business-area-02.webp`,
    expected_effect_01: `${R2_BASE}/homepage/main/expected-effect-01.webp`,
    expected_effect_02: `${R2_BASE}/homepage/main/expected-effect-02.webp`,
    expected_effect_03: `${R2_BASE}/homepage/main/expected-effect-03.webp`,
    cta: `${R2_BASE}/homepage/main/cta.webp`,
  },
  about: {
    greeting: {
      title: `${R2_BASE}/homepage/about/greeting/title.webp`,
      content: `${R2_BASE}/homepage/about/greeting/content.webp`,
    },
    esg: {
      title: `${R2_BASE}/homepage/about/esg/title.webp`,
      environmental_01: `${R2_BASE}/homepage/about/esg/environmental-01.webp`,
      social_01: `${R2_BASE}/homepage/about/esg/social-01.webp`,
      social_02: `${R2_BASE}/homepage/about/esg/social-02.webp`,
      social_03: `${R2_BASE}/homepage/about/esg/social-03.webp`,
      social_04: `${R2_BASE}/homepage/about/esg/social-04.webp`,
      governance_01: `${R2_BASE}/homepage/about/esg/governance-01.webp`,
      social_05: `${R2_BASE}/homepage/about/esg/social-05.webp`,
      governance_02: `${R2_BASE}/homepage/about/esg/governance-02.webp`,
    },
    organization: {
      title: `${R2_BASE}/homepage/about/organization/title.webp`,
      branch_role_01: `${R2_BASE}/homepage/about/organization/branch-role-01.webp`,
      branch_role_02: `${R2_BASE}/homepage/about/organization/branch-role-02.webp`,
      branch_role_03: `${R2_BASE}/homepage/about/organization/branch-role-03.webp`,
      branch_principle_01: `${R2_BASE}/homepage/about/organization/branch-principle-01.webp`,
      branch_principle_02: `${R2_BASE}/homepage/about/organization/branch-principle-02.webp`,
      branch_principle_03: `${R2_BASE}/homepage/about/organization/branch-principle-03.webp`,
    },
    directions: {
      title: `${R2_BASE}/homepage/about/directions/title.webp`,
      icon_01: `${R2_BASE}/homepage/about/directions/icon-01.webp`,
      icon_02: `${R2_BASE}/homepage/about/directions/icon-02.webp`,
      icon_03: `${R2_BASE}/homepage/about/directions/icon-03.webp`,
    },
  },
  industry: {
    operation: {
      problem: `${R2_BASE}/homepage/industry/operation/problem.webp`,
      problem_icon_01: `${R2_BASE}/homepage/industry/operation/problem-icon-01.webp`,
      problem_icon_02: `${R2_BASE}/homepage/industry/operation/problem-icon-02.webp`,
      problem_icon_03: `${R2_BASE}/homepage/industry/operation/problem-icon-03.webp`,
      operation_01: `${R2_BASE}/homepage/industry/operation/operation-01.webp`,
      operation_02: `${R2_BASE}/homepage/industry/operation/operation-02.webp`,
      operation_03: `${R2_BASE}/homepage/industry/operation/operation-03.webp`,
      operation_04: `${R2_BASE}/homepage/industry/operation/operation-04.webp`,
      expected_effect: `${R2_BASE}/homepage/industry/operation/expected-effect.webp`,
    },
    world_food: {
      menu_description: `${R2_BASE}/homepage/industry/world-food/menu-description.webp`,
      differentiator_01: `${R2_BASE}/homepage/industry/world-food/differentiator-01.webp`,
      differentiator_02: `${R2_BASE}/homepage/industry/world-food/differentiator-02.webp`,
    },
  },
} as const;
