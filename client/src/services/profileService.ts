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
      investmentFocus: formData.investmentFocus || [],
      investmentRange: formData.investmentRange,
      portfolioSize: formData.portfolioSize ? parseInt(formData.portfolioSize) : undefined,
      
      // Mentor specific
      expertise: formData.expertise || [],
      experience: formData.experience,
      mentorshipType: formData.mentorshipType || [],
      
      // Support and skills
      supportNeeded: formData.supportNeeded,
      supportOffered: formData.supportOffered,
      skills: formData.skills || [],
      interests: formData.interestsTags?.split(',').map((tag: string) => tag.trim()) || formData.interests || [],
      
      // Profile settings
      isPublic: formData.isPublic !== false,
    };

    const response = await apiRequest('/api/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to create profile');
    }

    return await response.json();

  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId: number) => {
  try {
    const response = await apiRequest(`/api/profiles/${userId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch profile');
    }

    return await response.json();
    
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: number, updateData: any) => {
  try {
    const response = await apiRequest(`/api/profiles/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return await response.json();

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