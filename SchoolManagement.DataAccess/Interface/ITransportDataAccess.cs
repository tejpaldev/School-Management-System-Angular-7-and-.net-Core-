using SchoolManagement.DataAccess.Models;
using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Interface
{
    public interface ITransportDataAccess
    {
        IEnumerable<BusRoute> BusRoute(Guid locationId);
        IEnumerable<Location> Location();
        BusRoute SearchBusRouteById(Guid id);
        BusRoute SearchBusRouteByName(string name);
        Location SearchLocationById(Guid id);
        Location SearchLocationByName(string name);
        int AddLocation(Location loc);
        int AddBusroute(BusRoute bus);
        int DeleteLocation(Location loc);
        int DeleteBusroute(BusRoute bus);
        int EditLocation(Location loc);
        int EditBusroute(BusRoute bus);
    }
}