import { render, screen } from '@testing-library/react';
import { FormProvider } from '../context/FormContext';
import PersonalDetails from './PersonalDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const renderWithContext = () => {
  return render(
      <FormProvider>
        <PersonalDetails />
      </FormProvider>
  );
};

describe('PersonalDetails Component', () => {
  test('renders form fields correctly', () => {
    renderWithContext();

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Employment Status/i)).toBeInTheDocument();
  });
});
