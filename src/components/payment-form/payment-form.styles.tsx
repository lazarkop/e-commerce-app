import styled from 'styled-components';

import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 350px;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 20px;
  margin-bottom: 40px;
`;