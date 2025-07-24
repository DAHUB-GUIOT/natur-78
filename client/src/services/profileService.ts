import { apiRequest } from '@/lib/queryClient';

export type CategoryType = 'startup' | 'investor' | 'mentor' | 'ecosystem' | 'attendee' | 'sponsor';

export const createUserProfile = async (
  userId: number,
  formData: any,
  category: CategoryType,
  subcategory?: string
) => {
  try {
    // Map form data to our new schema
    const profileData = {
      userId,
      fullName: formData.name || formData.fullName,
      userCategory: category,
      subcategory: subcategory || formData.subcategory,
      
      // Contact info
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      website: formData.website,
      linkedin: formData.linkedin,
      
      // Profile content
      bio: formData.profileBio || formData.bio,
      description: formData.description,
      
      // Location
      country: formData.country,
      city: formData.city || formData.location,
      
      // Startup specific
      startupName: formData.startupName,
      foundingYear: formData.foundingYear ? parseInt(formData.foundingYear) : undefined,
      stage: formData.startupStage || formData.stage,
      sector: formData.sector,
      teamSize: formData.teamSize ? parseInt(formData.teamSize) : undefined,
      fundingNeeded: formData.fundingNeeded,
      currentRevenue: formData.currentRevenue,
      
      // Investor specific
      investmentFocus: typeof formData.investmentFocus === 'string' ? 
        (formData.investmentFocus ? formData.investmentFocus.split(',').map((item: string) => item.trim()).filter(Boolean) : []) : 
        (formData.investmentFocus || []),
      investmentRange: formData.investmentRange,
      portfolioSize: formData.portfolioSize ? parseInt(formData.portfolioSize) : undefined,
      
      // Mentor specific
      expertise: typeof formData.expertise === 'string' ? 
        (formData.expertise ? formData.expertise.split(',').map((item: string) => item.trim()).filter(Boolean) : []) : 
        (formData.expertise || []),
      experience: formData.experience,
      mentorshipType: typeof formData.mentorshipType === 'string' ? 
        (formData.mentorshipType ? formData.mentorshipType.split(',').map((item: string) => item.trim()).filter(Boolean) : []) : 
        (formData.mentorshipType || []),
      
      // Support and skills
      supportNeeded: formData.supportNeeded,
      supportOffered: formData.supportOffered,
      skills: typeof formData.skills === 'string' ? 
        (formData.skills ? formData.skills.split(',').map((item: string) => item.trim()).filter(Boolean) : []) : 
        (formData.skills || []),
      interests: formData.interestsTags ? 
        formData.interestsTags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : 
        (typeof formData.interests === 'string' ? 
          (formData.interests ? formData.interests.split(',').map((item: string) => item.trim()).filter(Boolean) : []) : 
          (formData.interests || [])),
      
      // Profile settings
      isPublic: formData.isPublic !== false,
    };

    const response = await apiRequest('/api/profiles', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });

    return response;

  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId: number) => {
  try {
    const response = await apiRequest(`/api/profiles/${userId}`);
    return { profile: response };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { profile: null };
  }
};

export const updateUserProfile = async (userId: number, updateData: any) => {
  try {
    const response = await apiRequest(`/api/profiles/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });

    return response;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Note: File upload functionality would need to be implemented separately
// as we don't have storage setup in this migration
export const updateProfileImage = async (userId: number, file: File, type: 'profile' | 'cover') => {
  // This would require implementing file upload endpoints and storage
  // For now, return a placeholder response
  console.warn("Profile image upload not implemented yet in new backend");
  return { url: null };
};