import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { conduitApi } from '~shared/api';

type Profile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

type UseProfileOptions = UseQueryOptions<Profile, unknown, Profile, string[]>;

function mapProfileDto(
  profileDto: Record<'profile', conduitApi.ProfileDto>,
): Profile {
  return {
    ...profileDto.profile,
  };
}

export function useProfile(profile: string, options?: UseProfileOptions) {
  return useQuery(
    ['profile', profile],
    async () => {
      const profileDto = await conduitApi.Profile.profile(profile);
      return mapProfileDto(profileDto);
    },
    options,
  );
}
