import Styled from '@emotion/native';

const CardContainer = Styled.View(({ theme }) => ({
  paddingHorizontal: 13,
  paddingVertical: 15,
  borderRadius: theme.layout.BORDER.SECONDARY,
  backgroundColor: theme.color.WHITE,
}));

export default CardContainer;
