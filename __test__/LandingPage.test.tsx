import { render, screen } from "@testing-library/react";
import Banner from "@/components/Banner";
import TopMenu from "@/components/TopMenu";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getServerSession } from 'next-auth';
import getUserProfile from '../src/libs/getUserProfile';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    prefetch: jest.fn(),
    push: jest.fn(),
  }),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('../src/libs/getUserProfile', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Banner Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      prefetch: jest.fn(),
    });

    (useSession as jest.Mock).mockReturnValue({ data: null });
  });

  it("Should have top banner title", () => {
    render(<Banner />);
    const bannerText = screen.getByText("Discover Comfort Everywhere You Go");
    expect(bannerText).toBeInTheDocument();
  });

  const covers = ["cover1.jpg", "cover2.jpg", "cover3.jpg", "cover4.jpg"];

  it("Should change image when click banner", async () => {
    render(<Banner />);
    const banner = screen.getByRole("img") as HTMLImageElement;

    for (let i = 0; i < covers.length; i++) {
      await userEvent.click(banner);
      expect(banner.src).toContain(covers[(i + 1) % 4]);
    }
  });

  it("Should navigate to /hotel on button click", async () => {
    render(<Banner />);
    const button = screen.getByRole("button", { name: /Book Your Hotel NOW/i });
    await userEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith("/hotel");
  });
});


describe('TopMenu Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders login and register links when no user session exists', async () => {
    render(await TopMenu());

    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Sign-In')).toBeInTheDocument();
  });

  it('Renders admin menu when user is an admin', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { token: 'mock-token', name: 'Admin User' },
    });

    (getUserProfile as jest.Mock).mockResolvedValue({
      data: { role: 'admin' },
    });

    render(await TopMenu());
    
    expect(screen.getByText('Manage')).toBeInTheDocument();
    expect(screen.getByText('Select Hotel')).toBeInTheDocument();
    expect(screen.getByText('All Booking')).toBeInTheDocument();
    expect(screen.getByText('Sign-Out of Admin User')).toBeInTheDocument();
  });

  it('Renders user menu when user is not an admin', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { token: 'mock-token', name: 'Regular User' },
    });

    (getUserProfile as jest.Mock).mockResolvedValue({
      data: { role: 'user' },
    });

    render(await TopMenu());

    expect(screen.getByText('Manage')).toBeInTheDocument();
    expect(screen.getByText('Select Hotel')).toBeInTheDocument();
    expect(screen.getByText('My Booking')).toBeInTheDocument();
    expect(screen.getByText('Sign-Out of Regular User')).toBeInTheDocument();
  });
});
