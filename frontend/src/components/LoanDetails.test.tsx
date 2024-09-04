import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FormProvider } from '../context/FormContext';
import LoanDetails from './LoanDetails';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../constants/PageRoutes';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock useForm context
const mockSetLoanDetails = jest.fn();
const mockSubmitData = jest.fn();

jest.mock('../context/FormContext', () => ({
  useForm: () => ({
    setLoanDetails: mockSetLoanDetails,
    submitData: mockSubmitData,
  }),
}));

const renderWithContext = () => {
  return render(
    <MemoryRouter>
      <FormProvider>
        <LoanDetails />
      </FormProvider>
    </MemoryRouter>
  );
};

describe('LoanDetails Component', () => {
  test('renders form fields correctly', () => {
    renderWithContext();
    
    expect(screen.getByLabelText(/Vehicle Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deposit/i)).toBeInTheDocument();
  });

  test('submits the form and navigates correctly', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    renderWithContext();

    fireEvent.change(screen.getByLabelText(/Vehicle Price/i), { target: { value: '30000' } });
    fireEvent.change(screen.getByLabelText(/Deposit/i), { target: { value: '2000' } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(mockSubmitData).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(PageRoutes.Quotes);
    });
  });
});
