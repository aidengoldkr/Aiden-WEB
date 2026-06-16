import baekjoonMemorialImage1 from "../asset/project/baekjoon-memorial/1.png";
import baekjoonMemorialImage2 from "../asset/project/baekjoon-memorial/2.png";
import baekjoonMemorialImage3 from "../asset/project/baekjoon-memorial/3.png";
import onAlimImage1 from "../asset/project/on-alim/1.png";
import onAlimImage2 from "../asset/project/on-alim/2.png";
import patentsenseImage1 from "../asset/project/patantsense/1.png";
import patentsenseImage2 from "../asset/project/patantsense/2.png";
import safeGroundImage1 from "../asset/project/safe_ground/1.png";
import safeGroundImage2 from "../asset/project/safe_ground/2.png";
import safeGroundImage3 from "../asset/project/safe_ground/3.png";
import toditImage1 from "../asset/project/todit/1.png";
import toditImage2 from "../asset/project/todit/2.png";
import toditImage3 from "../asset/project/todit/3.png";
import toditImage4 from "../asset/project/todit/4.png";

import type { StaticImageData } from "next/image";

export type ProjectThumbnailImage = {
  src: string;
  width?: number;
  height?: number;
};

const assetImages: Record<string, StaticImageData> = {
  "baekjoon-memorial/1.png": baekjoonMemorialImage1,
  "baekjoon-memorial/2.png": baekjoonMemorialImage2,
  "baekjoon-memorial/3.png": baekjoonMemorialImage3,
  "on-alim/1.png": onAlimImage1,
  "on-alim/2.png": onAlimImage2,
  "patantsense/1.png": patentsenseImage1,
  "patantsense/2.png": patentsenseImage2,
  "safe_ground/1.png": safeGroundImage1,
  "safe_ground/2.png": safeGroundImage2,
  "safe_ground/3.png": safeGroundImage3,
  "todit/1.png": toditImage1,
  "todit/2.png": toditImage2,
  "todit/3.png": toditImage3,
  "todit/4.png": toditImage4,
};

export function resolveProjectThumbnailImage(
  path: string
): ProjectThumbnailImage {
  const asset = assetImages[path];

  if (!asset) {
    return { src: path };
  }

  return {
    src: asset.src,
    width: asset.width,
    height: asset.height,
  };
}
