from typing import Optional, List, Any

from pydantic import BaseModel


class CrewVisualsData(BaseModel):
    labels: Optional[list]
    x: Optional[list]
    y: Optional[list]


class CrewVisuals(BaseModel):
    type: str
    data: CrewVisualsData
    title: str


class CrewResponse(BaseModel):
    summary: str
    visuals: Optional[Any]


class CrewReport(BaseModel):
    summary: str
    visuals: Optional[List[CrewVisuals]]