"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tweet } from "react-tweet";
import { fetchTweet } from "react-tweet/api";
import { useEffect, useState } from "react";

interface TweetResponse {
  data: {
    created_at: string;
  };
}

export default function Component() {
  const [daysAgoSFW, setDaysAgoSFW] = useState<number | null>(null);
  const [daysAgoNSFW, setDaysAgoNSFW] = useState<number | null>(null);

  // Static counter values (you can replace these with actual calculated values)
  const sfwDays = 7;
  const nsfwDays = 3;

  // Twitter post IDs (replace these with actual tweet IDs)
  const sfwTweetId = "1848290806710317310";
  const nsfwTweetId = "1846178255784620265";

  useEffect(() => {
    const fetchTweetDataSFW = async () => {
      try {
        const response = await fetch(
          `https://react-tweet.vercel.app/api/tweet/${sfwTweetId}`,
        );
        const json: TweetResponse = await response.json();

        // Extract the created_at field
        const createdAt = json.data.created_at;

        // Convert created_at to a Date object
        const createdDate = new Date(createdAt);

        // Get the current date in PST
        const now = new Date();
        const utcOffset = now.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
        const nowInPST = new Date(
          now.getTime() + utcOffset - 8 * 60 * 60 * 1000,
        ); // Adjust to PST (UTC-8)

        // Calculate the difference in time
        const timeDifference = nowInPST.getTime() - createdDate.getTime();

        // Convert difference to days
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24),
        );

        // Set the result in state
        setDaysAgoSFW(daysDifference);
      } catch (error) {
        console.error("Error fetching tweet data:", error);
      }
    };

    const fetchTweetDataNSFW = async () => {
      try {
        const response = await fetch(
          `https://react-tweet.vercel.app/api/tweet/${nsfwTweetId}`,
        );
        const json: TweetResponse = await response.json();

        // Extract the created_at field
        const createdAt = json.data.created_at;

        // Convert created_at to a Date object
        const createdDate = new Date(createdAt);

        // Get the current date in PST
        const now = new Date();
        const utcOffset = now.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
        const nowInPST = new Date(
          now.getTime() + utcOffset - 8 * 60 * 60 * 1000,
        ); // Adjust to PST (UTC-8)

        // Calculate the difference in time
        const timeDifference = nowInPST.getTime() - createdDate.getTime();

        // Convert difference to days
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24),
        );

        // Set the result in state
        setDaysAgoNSFW(daysDifference);
      } catch (error) {
        console.error("Error fetching tweet data:", error);
      }
    };

    fetchTweetDataSFW();
    fetchTweetDataNSFW();
  }, []);

  return (
    <div className="grid h-screen grid-cols-1 gap-4 p-4 md:grid-cols-2">
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="text-center">
            Days since Shizu's SFW content
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col items-center justify-center">
          <div className="mb-4 text-6xl font-bold">{daysAgoSFW}</div>
          <div className="w-full max-w-md">
            <Tweet id={sfwTweetId} />
          </div>
        </CardContent>
      </Card>

      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="text-center">
            Days since Shizu's NSFW content
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col items-center justify-center">
          <div className="mb-4 text-6xl font-bold">{daysAgoNSFW}</div>
          <div className="w-full max-w-md">
            <Tweet id={nsfwTweetId} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
