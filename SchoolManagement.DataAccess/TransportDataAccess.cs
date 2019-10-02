using System;
using System.Collections.Generic;
using SchoolManagement.DataAccess.Interface;
using System.Linq;
using SchoolManagement.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagement.DataAccess
{
    public class TransportDataAccess : ITransportDataAccess
    {
        private SchoolEntities _dbContext;
        private readonly Guid _activeStatus = Guid.Parse("10000000-0000-0000-0000-000000000000");
        public TransportDataAccess(SchoolEntities schoolEntites)
        {
            _dbContext = schoolEntites;
        }

        public IEnumerable<BusRoute> BusRoute(Guid locationId)
        {
            try
            {
                var result = _dbContext.BusRoute.Where(x => x.LocationId == locationId && x.StatusId == _activeStatus);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Location> Location()
        {
            try
            {
                var result = _dbContext.Location.Where(x => x.StatusId == _activeStatus);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BusRoute SearchBusRouteById(Guid id)
        {
            try
            {
                var result = _dbContext.BusRoute.Where(x => x.Id == id && x.StatusId == _activeStatus)
                    .SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BusRoute SearchBusRouteByName(string name)
        {
            try
            {
                var result = _dbContext.BusRoute.Where(x => x.Name == name && x.StatusId == _activeStatus)
                    .SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Location SearchLocationById(Guid id)
        {
            try
            {
                var result = _dbContext.Location.Where(x => x.Id == id && x.StatusId == _activeStatus)
                    .SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Location SearchLocationByName(string name)
        {
            try
            {
                var result = _dbContext.Location.Where(x => x.Name == name && x.StatusId == _activeStatus)
                    .SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddLocation(Location loc)
        {
            try
            {
                _dbContext.Location.Add(loc);
                var returnValue = _dbContext.SaveChanges();
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddBusroute(BusRoute bus)
        {
            try
            {
                _dbContext.BusRoute.Add(bus);
                var returnValue = _dbContext.SaveChanges();
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteLocation(Location loc)
        {
            try
            {
                _dbContext.Location.Add(loc);
                _dbContext.Entry(loc).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteBusroute(BusRoute bus)
        {
            try
            {
                _dbContext.BusRoute.Add(bus);
                _dbContext.Entry(bus).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int EditLocation(Location loc)
        {
            try
            {
                _dbContext.Location.Add(loc);
                _dbContext.Entry(loc).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int EditBusroute(BusRoute bus)
        {
            try
            {
                _dbContext.BusRoute.Add(bus);
                _dbContext.Entry(bus).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}