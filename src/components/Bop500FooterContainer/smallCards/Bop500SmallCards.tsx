import { useSelector } from "@/app/store";
import { TooltipTitleContainer } from "@/components/Bop500FooterContainer/SmallCardTooltipTitleContainer";
import CircularProgressCard from "@/components/CircularProgressCard";
import { Bop500SmallCardData } from "@/constants/Bop500-SmallCard-data";
import { Grid, Skeleton, useTheme } from "@mui/material";

interface IProps {
  activeRegionTab: string;
  handleRegionTabChange: (regionName: string) => void;
}

function Bop500SmallCards({ activeRegionTab, handleRegionTabChange }: IProps) {
  const theme = useTheme();
  const { totalCitiesInRegion, loading } = useSelector((state) => state.cities);

  return (
    <Grid
      container
      spacing={4}
      p={2}
      sx={{
        flexWrap: "nowrap",
        overflowX: "scroll",
      }}
    >
      {Bop500SmallCardData?.map((cardData, index) => {
        return (
          <Grid item xs={6} md={4} lg={3} key={index}>
            <CircularProgressCard
              title={cardData?.title}
              subtitle={cardData?.subTitle}
              value={
                loading || !totalCitiesInRegion?.[cardData?.value] ? (
                  <Skeleton variant="text" height="2rem" width="2rem" />
                ) : (
                  totalCitiesInRegion?.[cardData?.value]
                )
              }
              icon={cardData?.icon as any}
              linearProgressBgColor={
                activeRegionTab === cardData?.linearProgressBgColor &&
                theme.colors.info.light
              }
              tooltipTitle={
                <TooltipTitleContainer
                  buttonType="AccessData"
                  category="bopconsulting.com"
                  title="BOP500-World Cities | Culture Index"
                  description="The city index is based on 500 cities which..."
                />
              }
              onClick={handleRegionTabChange}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Bop500SmallCards;
