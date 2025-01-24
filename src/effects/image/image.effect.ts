import { gen } from '__tests__/generator';

export const uploadImg = async (imageFile: File) => {
  // 실제 api -> upload된 src url 리턴
  return gen.img();
};
