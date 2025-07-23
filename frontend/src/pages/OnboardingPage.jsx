import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import styled from "styled-components";
import { LANGUAGES } from "../contants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

 const handleProfilePicChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormState((prev) => ({
      ...prev,
      profilePic: URL.createObjectURL(file), // For preview
      profilePicFile: file, // Store file for upload
    }));
    toast.success("Profile photo selected!");
  }
};

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("fullName", formState.fullName);
  formData.append("bio", formState.bio);
  formData.append("nativeLanguage", formState.nativeLanguage);
  formData.append("location", formState.location);
  if (formState.profilePicFile) {
    formData.append("profilePic", formState.profilePicFile); // Correct: send file to backend
  }
  onboardingMutation(formData); // Make sure your mutation sends FormData, not JSON
};

  return (
    <StyledPage>
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient bg-dark px-3 py-5">
        <div className="card glass-card text-white w-100 shadow-lg" style={{ maxWidth: "720px" }}>
          <div className="card-body p-4 p-md-5">
            <h2 className="text-center fw-bold text-success mb-4">Complete Your Profile</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Avatar */}
              <div className="d-flex flex-column align-items-center mb-4">
                <div className="avatar-wrapper">
                  {formState.profilePic ? (
                    <img src={formState.profilePic} alt="Avatar" className="avatar-img" />
                  ) : (
                    <div className="avatar-placeholder">
                      <i className="bi bi-person-circle fs-1 text-white-50"></i>
                    </div>
                  )}
                </div>
                <label className="btn btn-outline-light btn-sm rounded-pill mt-2">
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handleProfilePicChange} hidden />
                </label>
              </div>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control rounded-pill bg-dark text-white border border-success"
                  placeholder="Your full name"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                />
              </div>

              {/* Bio */}
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  className="form-control rounded-4 bg-dark text-white border border-success"
                  rows="3"
                  placeholder="Tell others about yourself and your language learning goals"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                ></textarea>
              </div>

              {/* Native Language */}
              <div className="mb-3">
                <label className="form-label">Native Language</label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="form-select bg-dark text-white border border-success"
                >
                  <option value="" disabled>
                    Select your native language
                  </option>
                  {LANGUAGES.filter(lang => lang && lang.trim() !== "").map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control rounded-pill bg-dark text-white border border-success"
                  placeholder="City, Country"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-success w-100 rounded-pill fw-bold py-2"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-circle me-2"></i> Save Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  .glass-card {
    background: rgba(0, 0, 0, 0.75);
    border: 1px solid rgba(40, 167, 69, 0.3);
    backdrop-filter: blur(8px);
    border-radius: 1rem;
  }

  .avatar-wrapper {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #28a745;
    background-color: #444;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input::placeholder,
  textarea::placeholder {
    color: #bbb !important;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: #28a745 !important;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
  }
`;

export default OnboardingPage;