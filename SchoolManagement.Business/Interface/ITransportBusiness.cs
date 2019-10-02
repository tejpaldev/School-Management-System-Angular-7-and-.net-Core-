using System;
using System.Collections.Generic;
using SchoolManagement.Model;

namespace SchoolManagement.Business.Interface
{
    public interface ITransportBusiness
    {
        List<Location> Location();
        List<Busroute> SearchBusrouteByLocationId(Guid locationId);
        Busroute SearchBusroute(Busroute busroute);
        Location SearchLocation(Location location);
        bool AddLocation(Location location);
        bool EditLocation(Location location);
        bool DeleteLocation(Location location);
        bool DeleteBusroute(Busroute busroute);
        bool EditBusroute(Busroute busroute);
        bool AddBusroute(Busroute busroute);
    }
}