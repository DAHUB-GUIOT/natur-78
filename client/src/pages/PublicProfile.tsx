
import React from 'react';
import { useParams } from 'wouter';
import { ProfileViewer } from '@/components/profile/ProfileViewer';
import { UserCategory } from '@/components/profile/ProfileHeader';
import { useToast } from '@/components/ui/use-toast';

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  
  // We would normally get the user category from an API call
  // For now, let's determine it based on username
  const getUserCategory = (): { category: UserCategory, subcategory: string } => {
    if (!username) return { category: 'ecosystem', subcategory: 'ngo' };
    
    if (username.includes('startup') || username === 'greentrip') {
      return { 
        category: 'startup', 
        subcategory: username.includes('mvp') ? 'mvp' : 
                     username.includes('idea') ? 'idea' : 
                     username.includes('growth') ? 'growth' : 'established'
      };
    } else if (username.includes('sponsor') || username === 'ecotours_col') {
      return { 
        category: 'sponsor',
        subcategory: username.includes('commercial') ? 'commercial' :
                     username.includes('allied') ? 'allied' :
                     username.includes('startup') ? 'startup' : 'institution'
      };
    } else if (username.includes('attendee') || username === 'maria_eco') {
      return { 
        category: 'attendee',
        subcategory: username.includes('tourist') ? 'tourist-national' :
                     username.includes('international') ? 'tourist-international' :
                     username.includes('student') ? 'student' : 'citizen'
      };
    } else if (username.includes('nomad') || username === 'nomad_ale') {
      return { 
        category: 'digital-nomad',
        subcategory: username.includes('creator') ? 'content-creator' :
                     username.includes('remote') ? 'remote-worker' :
                     username.includes('community') ? 'nomad-community' :
                     username.includes('entrepreneur') ? 'nomad-entrepreneur' : 'travel-blogger'
      };
    } else {
      return { 
        category: 'ecosystem',
        subcategory: username.includes('agency') ? 'agency' :
                     username.includes('operator') ? 'operator' :
                     username.includes('guide') ? 'guide' :
                     username.includes('accommodation') ? 'accommodation' :
                     username.includes('ngo') ? 'ngo' :
                     username.includes('artist') ? 'artist' :
                     username.includes('educator') ? 'educator' :
                     username.includes('nomad') ? 'digital-nomad' : 'consultant'
      };
    }
  };
  
  const { category, subcategory } = getUserCategory();
  
  React.useEffect(() => {
    toast({
      title: "Perfil público",
      description: `Visitando el perfil de ${username}`,
    });
  }, [username]);
  
  return <ProfileViewer 
    username={username} 
    userCategory={category} 
    subcategory={subcategory} 
    isPublicView={true} 
  />;
};

export default PublicProfile;
