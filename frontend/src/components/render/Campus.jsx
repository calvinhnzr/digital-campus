import { useAtom } from "jotai"

import { campusDataAtom } from "../../store"

import NewBuilding from "./NewBuilding"
import NewFloor from "./NewFloor"
import NewRoom from "./NewRoom"

const Campus = () => {
  const [campusData, setCampusData] = useAtom(campusDataAtom)

  return (
    <>
      {campusData ? (
        <group className="campus">
          {campusData[0].buildings.map((building) => (
            <NewBuilding key={building._id} data={building}>
              {building.floors.map((floor) => (
                <NewFloor key={floor._id} data={floor}>
                  {floor.rooms.map((room) => (
                    <NewRoom key={room._id} data={room} />
                  ))}
                </NewFloor>
              ))}
            </NewBuilding>
          ))}
        </group>
      ) : (
        ""
      )}
    </>
  )
}

export default Campus
