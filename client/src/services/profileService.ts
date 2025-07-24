
import { supabase } from '@/integrations/supabase/client';
import { CategoryType } from '@/components/registration/RegistrationForm';

interface BaseProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  referral: string;
  profile_bio: string;
  interests_tags: string;
  expertise: string;
  user_category: string;
  subcategory: string;
}

interface StartupData {
  startup_name: string;
  founding_year: string;
  problem_solved: string;
  startup_stage: string;
  needs_visibility: boolean;
  needs_marketplace: boolean;
  needs_networking: boolean;
  needs_funding: boolean;
  needs_incubation: boolean;
}

interface SponsorData {
  company_size: string;
  budget: string;
  sponsor_activities: boolean;
  install_stand: boolean;
  brand_exposure: boolean;
  product_support: boolean;
  proposal: string;
}

interface EcosystemEntityData {
  org_type: string;
  years_operating: string;
  services_offered: string;
  certifications: string;
  wants_seal: boolean;
}

interface AttendeeData {
  occupation: string;
  interest_ecotourism: boolean;
  interest_community_tourism: boolean;
  interest_cultural_tourism: boolean;
  interest_slow_travel: boolean;
  interest_workshops: boolean;
  expectations: string;
}

export const createUserProfile = async (
  userId: string,
  formData: any,
  category: CategoryType,
  subcategory: string
) => {
  try {
    // Map common profile data
    const profileData: BaseProfileData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      location: formData.location,
      website: formData.website || null,
      referral: formData.referral,
      profile_bio: formData.profileBio || "",
      interests_tags: formData.interestsTags || "",
      expertise: formData.expertise || null,
      user_category: category,
      subcategory: subcategory,
    };
    
    // Insert profile data
    const { data: profileData_, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          ...profileData
        }
      ]);

    if (profileError) throw profileError;

    // Insert category-specific data
    switch(category) {
      case 'startup':
        const startupData: StartupData = {
          startup_name: formData.startupName || "",
          founding_year: formData.foundingYear || "",
          problem_solved: formData.problemSolved || "",
          startup_stage: formData.startupStage || "",
          needs_visibility: formData.supportNeeded?.visibility || false,
          needs_marketplace: formData.supportNeeded?.marketplace || false,
          needs_networking: formData.supportNeeded?.networking || false,
          needs_funding: formData.supportNeeded?.funding || false,
          needs_incubation: formData.supportNeeded?.incubation || false,
        };

        const { error: startupError } = await supabase
          .from('startups')
          .insert([
            {
              id: userId,
              ...startupData
            }
          ]);

        if (startupError) throw startupError;
        break;

      case 'sponsor':
        const sponsorData: SponsorData = {
          company_size: formData.companySize || "",
          budget: formData.budget || "",
          sponsor_activities: formData.participationType?.sponsorActivities || false,
          install_stand: formData.participationType?.installStand || false,
          brand_exposure: formData.participationType?.brandExposure || false,
          product_support: formData.participationType?.productSupport || false,
          proposal: formData.proposal || "",
        };

        const { error: sponsorError } = await supabase
          .from('sponsors')
          .insert([
            {
              id: userId,
              ...sponsorData
            }
          ]);

        if (sponsorError) throw sponsorError;
        break;

      case 'ecosystem':
        const ecosystemData: EcosystemEntityData = {
          org_type: formData.orgType || "",
          years_operating: formData.yearsOperating || "",
          services_offered: formData.servicesOffered || "",
          certifications: formData.certifications || "",
          wants_seal: formData.wantsSeal || false,
        };

        const { error: ecosystemError } = await supabase
          .from('ecosystem_entities')
          .insert([
            {
              id: userId,
              ...ecosystemData
            }
          ]);

        if (ecosystemError) throw ecosystemError;
        break;

      case 'attendee':
        const attendeeData: AttendeeData = {
          occupation: formData.occupation || "",
          interest_ecotourism: formData.interests?.ecotourism || false,
          interest_community_tourism: formData.interests?.communityTourism || false,
          interest_cultural_tourism: formData.interests?.culturalTourism || false,
          interest_slow_travel: formData.interests?.slowTravel || false,
          interest_workshops: formData.interests?.workshops || false,
          expectations: formData.expectations || "",
        };

        const { error: attendeeError } = await supabase
          .from('attendees')
          .insert([
            {
              id: userId,
              ...attendeeData
            }
          ]);

        if (attendeeError) throw attendeeError;
        break;
    }

    return { success: true };

  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    // Get base profile data
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    let categoryData = null;
    
    // Get category-specific data
    if (profileData) {
      switch(profileData.user_category) {
        case 'startup':
          const { data: startupData, error: startupError } = await supabase
            .from('startups')
            .select('*')
            .eq('id', userId)
            .single();

          if (startupError && !startupError.message.includes('No rows found')) {
            throw startupError;
          }
          
          categoryData = startupData;
          break;

        case 'sponsor':
          const { data: sponsorData, error: sponsorError } = await supabase
            .from('sponsors')
            .select('*')
            .eq('id', userId)
            .single();

          if (sponsorError && !sponsorError.message.includes('No rows found')) {
            throw sponsorError;
          }
          
          categoryData = sponsorData;
          break;

        case 'ecosystem':
          const { data: ecosystemData, error: ecosystemError } = await supabase
            .from('ecosystem_entities')
            .select('*')
            .eq('id', userId)
            .single();

          if (ecosystemError && !ecosystemError.message.includes('No rows found')) {
            throw ecosystemError;
          }
          
          categoryData = ecosystemData;
          break;

        case 'attendee':
          const { data: attendeeData, error: attendeeError } = await supabase
            .from('attendees')
            .select('*')
            .eq('id', userId)
            .single();

          if (attendeeError && !attendeeError.message.includes('No rows found')) {
            throw attendeeError;
          }
          
          categoryData = attendeeData;
          break;
      }
    }

    return {
      profile: profileData,
      categoryData
    };
    
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateProfileImage = async (userId: string, file: File, type: 'profile' | 'cover') => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${type}_image.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload the image to storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('profiles')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('profiles')
      .getPublicUrl(filePath);

    // Update the profile with the new image URL
    const updateData = type === 'profile' 
      ? { profile_image_url: publicUrl } 
      : { cover_image_url: publicUrl };

    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (updateError) throw updateError;

    return { publicUrl };
    
  } catch (error) {
    console.error(`Error updating ${type} image:`, error);
    throw error;
  }
};
