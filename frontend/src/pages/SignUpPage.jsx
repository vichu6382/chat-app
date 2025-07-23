import { useState } from 'react';
import { AppIamges } from '../asset/assets';
import 'animate.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

const SignUpPage = () => {
    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    // This is how we did it first , without using the our custom hook
    // const queryClient = useQueryClient();
    // const { mutate: signupMutation, isPending, error } = useMutation({
    //     mutationFn: signup,
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    // })

    const { isPending, error, signupMutation } = useSignUp();

    const handleSubmit = (e) => {
        e.preventDefault();
        signupMutation(signupData);

    };

    return (
        <SignUpPageStyle>
            <div className="container-fluid min-vh-100 bg-dark d-flex align-items-center justify-content-center p-3">
                <div
                    className="row bg-black text-white shadow-lg rounded-4 overflow-hidden w-100 p-3"
                    style={{ maxWidth: '1000px' }}
                >
                    {/* Right Image Section (Mobile first, Desktop last) */}
                    <div className="col-lg-6 p-0 order-first order-lg-last mb-4 mb-lg-0 d-flex align-items-center justify-content-center">
                        <img
                            src={AppIamges.signup}
                            alt="Chat illustration"
                            className="img-fluid floating-img animate__animated animate__fadeInRight"
                            style={{
                                objectFit: 'cover',
                                maxHeight: '300px',
                                borderRadius: '1rem',
                                width: '100%',
                                maxWidth: '400px',
                            }}
                        />
                    </div>

                    {/* Form Section */}
                    <div className="col-lg-6 p-4 p-lg-5">
                        <h2 className="text-success text-center mb-2 fw-bold">Welcome To VibeChat</h2>
                        <p className="text-center text-secondary mb-4">
                            Join VibeChat and connect instantly with your people.
                        </p>

                        {/* Error Massage is any */}

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                <span>{error?.response?.data?.message || "Signup failed"}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white border-secondary rounded-pill px-4"
                                    id="fullName"
                                    name="fullName"
                                    value={signupData.fullName}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, fullName: e.target.value })
                                    }
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control bg-dark text-white border-secondary rounded-pill px-4"
                                    id="email"
                                    name="email"
                                    value={signupData.email}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, email: e.target.value })
                                    }
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div className="mb-1">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control bg-dark text-white border-secondary rounded-pill px-4"
                                    id="password"
                                    name="password"
                                    value={signupData.password}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, password: e.target.value })
                                    }
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="form-text text-secondary mb-2">
                                Password must be at least 6 characters long
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="agree"
                                    name="agree"
                                    required
                                />
                                <label className="form-check-label text-secondary" htmlFor="agree">
                                    I agree to the{' '}
                                    <a href="#" className="text-success">
                                        terms
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-success">
                                        privacy policy
                                    </a>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-success w-100 rounded-pill py-2 fw-bold"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        &nbsp;Loading...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            <p className="text-center mt-3 text-secondary">
                                Already have an account?{' '}
                                <Link to="/login" className="text-success">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </SignUpPageStyle>
    );
};

const SignUpPageStyle = styled.div`
  @keyframes floatUpDown {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .floating-img {
    animation: floatUpDown 4s ease-in-out infinite;
  }
`;

export default SignUpPage;
